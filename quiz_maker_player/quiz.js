
Handlebars.registerHelper('ifHighScore', function(options) {
	var data = options.data.root;
	var score = data.score / data.total;
	if(score >= 0.8) return options.fn(this);
});

Handlebars.registerHelper('ifOkScore', function(options) {
	var data = options.data.root;
	var score = data.score / data.total;
	if(score > 0.3 && score < 0.8) return options.fn(this);
});

Handlebars.registerHelper('ifLowScore', function(options) {
	var data = options.data.root;
	var score = data.score / data.total;
	if(score <= 0.3) return options.fn(this);
});

var Game = function() {
	var score = 0;
  var currentQuestionIndex = 2;
	var answers = {};

	return {
		questions: quiz.questions,

		buildReviewTable: function() {
			var content = $('#template-answers-table').html();
			var template = Handlebars.compile(content);


			var templateData = [];

			var answers = this.showAnswers();
			var questions = this.questions;

			templateData = Object.keys(answers).map(function(questionId){
				var question = questions.filter(function(question){ return question.id === questionId; })[0];
				var answer = answers[questionId];
				var correctAnswer = question.answers.filter(function(answer){ return answer.correct; })[0];

				return {
					text: question.question,
					correct: answers[questionId].correct,
					theyAnsweredText: question.answers[answer.answerIndex].text,
					correctAnswerText: correctAnswer.text
				}
			});

			var table    = template({questions: templateData});
			return table;
		},

		getScore: function(){
			var total = quiz.questions.length;
			var score = 0;

			var correctlyAnswers = Object
				.keys(answers)
				.forEach(function(answer){
					if(answers[answer].correct) score = score + 1;
				});

			return {total: total, score: score};
		},

		showAnswers: function(){
      return answers;
		},

		endOfQuiz: function(){
			return currentQuestionIndex === quiz.questions.length;
		},

    getQuestionIndex: function() {
      return currentQuestionIndex;
    },

    answered: function(questionId, answerIndex) {
			var question = quiz.questions.filter( function(question){
				return question.id.toString() === questionId.toString();
			});

			if(question.length){
				var answer = question[0].answers[answerIndex];
				var correct = answer.correct;

				answers[question[0].id] = {
					correct: correct,
					answerIndex: answerIndex
				};
			}
			this.endOfQuiz();
      currentQuestionIndex += 1;
		}
	}
}

$(document).ready(function() {
	window.game = Game();

	$('#fullpage').fullpage({scrollOverflow: true});
	$.fn.fullpage.setMouseWheelScrolling(false);
	$.fn.fullpage.setAllowScrolling(false);

	$('.js-start').on('click', function(){
		$.fn.fullpage.moveTo(game.getQuestionIndex());
	});

	$('.js-qz-yes').on('click', function(){
		$.fn.fullpage.moveTo(game.getQuestionIndex() + 1);
	});

	$('.js-qz-no').on('click', function(){
		$.fn.fullpage.moveTo(game.getQuestionIndex() + 2);
	});

	$('.js-qz-share-yes').on('click', function(){
		var $q = $('.section.qz-share');

		$q.find('h2').text(
			Handlebars.compile(
				$q.find('h2').text()
			)(game.getScore())
		);

		$q.find('p').text(
			Handlebars.compile(
				$q.find('p').text()
			)(game.getScore())
		);
		$.fn.fullpage.moveTo(game.getQuestionIndex() + 4);
	});

	var validateForm = function() {
		$form = $('.js-qz-action-form');

		var data = $form.serializeArray();
		var errors = [];

		data.forEach( function(field){
			if(field.name === 'postcode') return;

			if(field.value === ''){
				errors.push({name: field.name, message: 'This field is required'});
			}

			var re = /\S+@\S+\.\S+/

			if(field.name === 'email' && field.value.length) {
				if(!re.test(field.value)) errors.push({name: 'email', message: 'Email address is incorrectly formatted'});
			}
		});

		return errors;
	}

	var updateForm = function(errors, form){
		form.find('p.help').text('');
		form.find('input').removeClass('is-danger');
		form.find('.select').removeClass('is-danger');

		errors.forEach(function(error){
			$("p.help." + error.name).text(error.message);
			if(error.name === 'country'){
				form.find(".select").addClass("is-danger");
			} else {
				$field = form.find("[name='"+error.name+"']");
				$field.addClass("is-danger");
			}
			$field.next('p').text(error.message);
		})
	};

	var submitAction = function(){

		var data = $('.js-qz-action-form').serializeArray();

		data = data.reduce(function(memo, item){
		  memo[item.name] = item.value;
		  return memo
		}, {});

		data.form_id = __QUIZ_FORM_ID;
		data.source = 'quiz';

		$.post('/api/pages/' + quiz.actionSlug + '/actions', data, function(resp){
			console.log(resp);
		});
	};

	$('.js-qz-action-form').on('submit', function(e){
		e.preventDefault();
		var errors = validateForm();
		if(errors.length){
			updateForm(errors, $('.js-qz-action-form'));
		} else {
			submitAction();
			$.fn.fullpage.moveTo(game.getQuestionIndex() + 2);
		}
	});

	$('.js-qz-share-dialog').on('click', function() {
		var $q = $('div.section.qz-share');
		window.q = $q

		var title = Handlebars.compile($q.data('title').trim())(game.getScore());
		var description = Handlebars.compile($q.data('description').trim())(game.getScore());
		var image = $q.data('image-url');


	  var url = window.location.href.split('?')[0];
	  var shareUrl = encodeURIComponent('http://share.sumofus.org/?url='+url+'&title='+title+'&source=quiz&description='+description+'&image='+image);
	  window.open('https://facebook.com/sharer.php?u='+shareUrl, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300');
	});


	// Display score breakdown.
	$('.qz-score-breakdown').on('click', function(e){
			e.preventDefault();
			var html = game.buildReviewTable();
			$('.qz-score-breakdown-table-section').html(html);
			$.fn.fullpage.moveTo(game.getQuestionIndex() + 3);
	});

	$('.qz-answers').on('click', 'button', function(){
    var $el = $(this);
    var questionId = $el.closest('div.qz-question').data('id');

		var index = $el.parent().parent().find('.column').index($el.parent());
    game.answered(questionId, index);
		if(game.endOfQuiz){
			var html = Handlebars.compile(quiz.scoreTemplate)(game.getScore());
			$('.qz-summary .js-content').html("<h2>" + html + "</h2>");
		}
		$.fn.fullpage.moveTo(game.getQuestionIndex());
	});
});
