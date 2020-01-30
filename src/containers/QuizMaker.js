import React, { Component } from 'react';
import { Field, Input, Textarea } from 'react-bulma-components';
import Form from '../components/quiz_maker/Form';
import Questions from '../components/quiz_maker/Questions';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
import Intro from './QuizMaker/Intro';
import { debounce } from 'lodash';

import {
  fetchQuiz,
  createQuestion,
  updateQuizContent,
  saveQuiz,
  saveShareImage,
  saveIntroImage,
  saveQuizImage,
  newQuizLoaded,
} from '../actions/index';
import { bindActionCreators } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Convert from '../lib/QuizMaker/convert';
import '../amplify_config';

class QuizMaker extends Component {
  constructor(props) {
    super(props);
    this.delayedSave = debounce(this.handleSave.bind(this), 800);

    this.state = {
      question: '',
      copyButton: 'Copy',
    };
  }

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id);
    this.props.newQuizLoaded();
  }

  handleChange(e) {
    this.setState({
      question: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createQuestion({ text: this.state.question });
    this.props.saveQuiz();
    this.setState({ question: '' });
  }

  payload() {
    let { quiz, questions } = this.props;

    questions = questions.map(question => {
      question.quizId = quiz.id;
      return question;
    });

    quiz.imageRoot = 'http://res.cloudinary.com/sumofus/image/upload';
    quiz.imagePathShared = 'c_limit,q_auto:good,w_1000/quiz';
    quiz.imageFbShared = 'c_fit,h_628,q_auto:good,w_1200/quiz';
    return Object.assign({}, quiz, { questions });
  }

  handleSave() {
    this.props.saveQuiz();
  }

  handleCopy() {
    this.setState({
      copyButton: 'Copied!',
    });

    setTimeout(() => {
      this.setState({
        copyButton: 'Copy',
      });
    }, 2000);
  }

  output() {
    return Convert(this.payload());
  }

  handleContentChange(e) {
    this.props.updateQuizContent({
      name: e.target.name,
      content: e.currentTarget.value,
    });

    this.delayedSave();
  }

  render() {
    const isSaving = this.props.control.saving ? 'is-loading' : '';

    return (
      <div>
        <Intro
          {...this.props}
          handleContentChange={this.handleContentChange.bind(this)}
        />
        <div className="section">
          <div className="container">
            <h1 className="title is-3">Questions</h1>
            <form className="form box" onSubmit={this.handleSubmit.bind(this)}>
              <Form
                question={this.state.question}
                handleChange={this.handleChange.bind(this)}
              />
            </form>
            <Questions
              quizId={this.props.quiz.id}
              questions={this.props.questions}
            />
          </div>
        </div>

        <div className="section">
          <div className="container">
            <h1 className="title is-3">Post Quiz</h1>
            <Form.Field>
              <label className="label">Post Quiz Title</label>
              <Form.Input
                name="postQuizTitle"
                className="is-medium"
                type="text"
                onChange={this.handleContentChange.bind(this)}
                value={this.props.quiz.postQuizTitle || ''}
              />
            </Form.Field>

            <Form.Field>
              <label className="label">Post Quiz Body</label>
              <Textarea
                placeholder="Enter something"
                name="postQuizMessage"
                value={this.props.quiz.postQuizMessage}
                onChange={this.handleContentChange.bind(this)}
              />
            </Form.Field>
            <Form.Field>
              <ImageUpload
                quizId={this.props.quiz.id}
                objectKey={'post_quiz'}
                section="callToActionImagePath"
                saveImage={this.props.saveQuizImage}
                image={this.props.quiz.callToActionImagePath}
              />
            </Form.Field>
            <Form.Field>
              <label className="label">Score Template</label>
              <Textarea
                name="scoreTemplate"
                value={this.props.quiz.scoreTemplate}
                onChange={this.handleContentChange.bind(this)}
              />
            </Form.Field>
            <Form.Field>
              <ImageUpload
                quizId={this.props.quiz.id}
                objectKey={'score'}
                section="scoreImagePath"
                saveImage={this.props.saveQuizImage}
                image={this.props.quiz.scoreImagePath}
              />
            </Form.Field>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <h1 className="title is-3">Facebook Share</h1>
            <Form.Field>
              <label className="label">FB Share Title</label>
              <Form.Input
                name="shareTitleTemplate"
                className="is-medium"
                type="text"
                onChange={this.handleContentChange.bind(this)}
                value={this.props.quiz.shareTitleTemplate || ''}
              />
            </Form.Field>
            <Form.Field>
              <label className="label">FB Share Body</label>
              <Textarea
                name="shareContentTemplate"
                value={this.props.quiz.shareContentTemplate}
                onChange={this.handleContentChange.bind(this)}
              />
            </Form.Field>
            <Form.Field>
              <ImageUpload
                quizId={this.props.quiz.id}
                objectKey={'share'}
                saveImage={this.props.saveShareImage}
                image={this.props.quiz.shareImagePath}
              />
            </Form.Field>
          </div>
        </div>

        <div className="section update-box">
          <div className="buttons">
            <CopyToClipboard text={this.output()}>
              <button className="button" onClick={this.handleCopy.bind(this)}>
                {this.state.copyButton}
              </button>
            </CopyToClipboard>
            <button
              className={`button is-danger ${isSaving}`}
              onClick={this.handleSave.bind(this)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    quiz: state.quiz,
    control: state.control,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchQuiz,
      createQuestion,
      updateQuizContent,
      saveQuiz,
      saveShareImage,
      saveIntroImage,
      saveQuizImage,
      newQuizLoaded,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizMaker);
