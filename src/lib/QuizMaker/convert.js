import Mustache from 'mustache';
import countries from './countrySelect';

const template = `
  {{={{{ }}}=}}
  <script id='template-answers-table' type='javascript/template'>
    <table class='table is-fullwidth is-centered'>
      <thead>
        <tr>
          <td></td>
          <td>You answered</td>
          <td>correct answer</td>
        </tr>
      </thead>
      <tbody>
        {{#each questions}}
          <tr>
            <td>{{question}}</td>
            <td>Paris</td>
            <td>Madrid</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  </script>

  {{{={{ }}=}}}
  <div class="section qz-question" id="qz-intro">
    <h1 class='title is-spaced is-1'><span>{{ title }}</span></h1>
    <h2 class='subtitle is-spaced is-3'><span>{{ subtitle }}</span></h2>
    <div>
      <button class='button is-large js-start' data-id='-1'>Start Quiz</button>
    </div>
  </div>
  {{#questions}}
    <div class="section qz-question" id="section-{{ id }}" data-id='{{ id }}'>
      <h1 class='title is-spaced is-1'><span>{{ question }}</span></h1>
      <div class='qz-section-wrapper'>
        <div class='columns qz-answers'>
          {{#answers}}
            <div class='column'>
              <button class='button is-large'>{{ text }}</button>
            </div>
          {{/answers}}
        </div>
      </div>
    </div>
  {{/questions}}
  <div id="qz-call-to-action" class="section qz-post-quiz-message">
    <div class='qz-section-wrapper'>
      <h1 class='title is-2'>{{{postQuizTitle}}}</h1>
      <p>{{{ postQuizMessage }}}</p>
      <div class="section-buttons buttons is-centered">
        <button class='button is-large js-qz-yes'>Add my name</button>
        <button class='button is-large js-qz-no'>No thanks</button>
      </div>
    </div>
  </div>

  <div class="section qz-action" id="qz-action">
    <div class='qz-section-wrapper'>
      <h1 class='title is-3'>Take Action</h1>
      <div class='columns'>
        <div class='column'>
          <form class='js-qz-action-form'>
            <div class="field">
              <div class="control">
                <input class='input' type='email' placeholder='Email' name='email' />
                <p class="help is-danger email"></p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class='input' type='text' placeholder='Name' name='name' />
                <p class="help is-danger name"></p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class='select'>
                  ${countries}
                </div>
                <p class="help is-danger country"></p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class='input' type='text' placeholder='Postcode' name='postal' />
                <p class="help is-danger postcode"></p>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class='button is-large'>Sign the Petition</button>
              </div>
            </div>
          </form>
        </div>
        <div class='column'>
          <p>{{ actionText }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="section qz-summary" id="qz-score">
    <div class='qz-section-wrapper'>
      <h1 class='js-content title is-2'></h1>
      <p>Will you share this game with your friends to see if they can beat your score?</p>
      <div class="section-buttons">
        <button class='button is-large quiz-share js-qz-share-yes'>Yes, I'll Share</button>
        <p><a class='qz-score-breakdown' href='#'>Give me my score breakdown</a></p>
      </div>
    </div>
  </div>

  <div class="section " id="qz-score-breakdown-table">
    <div class='qz-section-wrapper'>
      <div class='qz-score-breakdown-table-section'></div>
      <p>Will you share this game with your friends to see if they can beat your score?</p>
      <div class="section-buttons">
        <button class='button is-large quiz-share js-qz-share-yes'>Yes, I'll Share</button>
      </div>
    </div>
  </div>

  <div class="section qz-share" data-title="{{{ shareTitleTemplate }}}" data-description="{{{shareContentTemplate}}}" data-image-url="{{{ imageRoot }}}/{{{imageFbShared}}}/{{{ id }}}/share/raw/{{{shareImagePath}}}">
    <h1 class='title is-3'>Thanks, just click below to share</h1>
    <div class='facebook-inner'>
      <div class='qz-share-image'>
        <div>
          <img src="{{{ imageRoot }}}/{{{imageFbShared}}}/{{{ id }}}/share/raw/{{{shareImagePath}}}" />
          <h1 class='title'>{{{shareTitleTemplate}}}</h2>
          <p>{{{shareContentTemplate}}}</p>
        </div>
      </div>
    </div>
    <div class="section-buttons">
      <button class='button is-large js-qz-share-dialog share-on-facebook'>Share on Facebook</button>
    </div>
  </div>


  <style>
    {{#questions}}
      #section-{{id}}{
        background-image: url("{{{ imageRoot }}}/{{{imagePathShared}}}/{{{ quizId }}}/question/{{{id}}}/raw/{{{image}}}");
      }
    {{/questions}}

    #qz-intro, #qz-score-breakdown-table {
      background-image: url("{{{ imageRoot }}}/{{{imagePathShared}}}/{{{ id }}}/intro/raw/{{{introImagePath}}}");
    }

    #qz-call-to-action {
      background-image: url("{{{ imageRoot }}}/{{{imagePathShared}}}/{{{ id }}}/post_quiz/raw/{{{callToActionImagePath}}}");
    }

    #qz-score {
      background-image: url("{{{ imageRoot }}}/{{{imagePathShared}}}/{{{ id }}}/score/raw/{{{scoreImagePath}}}");
    }

    #qz-action {
      background-image: url("{{{ imageRoot }}}/{{{imagePathShared}}}/{{{ id }}}/action/raw/{{{actionImagePath}}}");
    }
  </style>
`;

const javascript = data => (`
<script>
  window.quiz = ${JSON.stringify(data)};
</script>
`);

const convert = (data) => {
  const templateData = Object.assign({}, data, {
    json: function() {
      return function (text, render) {
        return render(JSON.stringify(data));
      }
    }
  });

  const html = Mustache.render(template, templateData);
  return `${html}${javascript(data)}`;
};

export default convert;
