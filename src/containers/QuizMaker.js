import React, { Component } from 'react';
import { Message, Tag, Control, Field, Section, Textarea, Button, Level, Input } from 'reactbulma'
import Form from '../components/quiz_maker/Form';
import Questions from '../components/quiz_maker/Questions';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
import Intro from './QuizMaker/Intro';

import {
  fetchQuiz,
  createQuestion,
  updateTitle,
  updateSubTitle,
  updateActionSlug,
  updateQuizContent,
  saveQuiz,
  saveShareImage,
  saveIntroImage,
  saveQuizImage,
  newQuizLoaded,
 } from '../actions/index';
import { bindActionCreators } from 'redux';
import Amplify, { Storage, Auth } from 'aws-amplify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Convert from '../lib/QuizMaker/convert';

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:d971a7bb-3f58-4aff-9bb9-d13c9ad089a5', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'us-east-1_dFic90M1t', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '9ilre0g9agfcvtaeb1du82ag5', //OPTIONAL - Amazon Cognito Web Client ID
    },
    Storage: {
        bucket: 'sumofus.org.quiz', //REQUIRED -  Amazon S3 bucket
        region: 'us-east-1', //OPTIONAL -  Amazon service region
        identityPoolId: 'us-east-1:d971a7bb-3f58-4aff-9bb9-d13c9ad089a5'
    }
  }
);

class QuizMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      copyButton: 'Copy',
    }
  }

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.id);
    this.props.newQuizLoaded();
  }

  handleChange(e) {
    const target = e.target;

    this.setState({
      question: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createQuestion({text: this.state.question})
    this.setState({question: ''});
  }

  handleTitleChange(e) {
    this.props.updateTitle(e.target.value);
  }

  handleSlugChange(e) {
    this.props.updateActionSlug(e.target.value);
  }


  handleSubTitleChange(e) {
    this.props.updateSubTitle(e.target.value);
  }

  payload() {
    let { quiz, questions } = this.props;

    questions = questions.map( question => {
      question.quizId = quiz.id;
      return question;
    });

    quiz.imageRoot = "http://res.cloudinary.com/sumofus/image/upload"
    quiz.imagePathShared = "c_limit,q_auto:good,w_1000/quiz";
    quiz.imageFbShared = "c_fit,h_628,q_auto:good,w_1200/quiz";
    return Object.assign({}, quiz, { questions })
  }

  handleSave() {
    const properties = this.payload();
    this.props.saveQuiz(properties);
  }

  handleCopy() {
    this.setState({
      copyButton: 'Copied!'
    })

    setTimeout(  () => {
      this.setState({
        copyButton: 'Copy'
      })
    }, 2000)
  }

  output() {
    return Convert(this.payload());
  }

  handleContentChange(e) {
    const name = e.target.name;
    const content = e.target.value;
    this.props.updateQuizContent({name, content});
  }

  render() {
    const isSaving = this.props.quiz.saving ? 'is-loading' : '';

    return(
      <div>
        <Intro {...this.props} handleContentChange={this.handleContentChange.bind(this)}/>
        <div className='section'>
          <div className='container'>
            <h1 className='title is-3'>Questions</h1>
            <form className='form box' onSubmit={this.handleSubmit.bind(this)}>
              <Form question={this.state.question} handleChange={this.handleChange.bind(this)} />
            </form>
            <Questions quizId={this.props.quiz.id} questions={this.props.questions} />
          </div>
        </div>

        <div className='section'>
          <div className='container'>
            <h1 className='title is-3'>Post Quiz</h1>
            <Field>
              <label className="label">Post Quiz Title</label>
              <Input name='postQuizTitle' className='is-medium' type='text' onChange={this.handleContentChange.bind(this)} value={this.props.quiz.postQuizTitle || ''} />
            </Field>

            <Field>
              <label className="label">Post Quiz Body</label>
              <Textarea placeholder="Enter something" name='postQuizMessage' value={this.props.quiz.postQuizMessage} onChange={this.handleContentChange.bind(this)} />
            </Field>
            <Field>
              <ImageUpload
                quizId={this.props.quiz.id}
                objectKey={'post_quiz'}
                section='callToActionImagePath'
                saveImage={ this.props.saveQuizImage }
                image={this.props.quiz.callToActionImagePath} />
            </Field>
            <Field>
              <label className="label">Score Template</label>
              <Textarea name='scoreTemplate' value={this.props.quiz.scoreTemplate} onChange={this.handleContentChange.bind(this)} />
            </Field>
            <Field>
              <ImageUpload
                quizId={this.props.quiz.id}
                objectKey={'score'}
                section='scoreImagePath'
                saveImage={ this.props.saveQuizImage }
                image={this.props.quiz.scoreImagePath} />
            </Field>
          </div>
        </div>
        <div className='section'>
          <div className='container'>
            <h1 className='title is-3'>Facebook Share</h1>
            <Field>
              <label className="label">FB Share Title</label>
              <Input name='shareTitleTemplate' className='is-medium' type='text' onChange={this.handleContentChange.bind(this)} value={this.props.quiz.shareTitleTemplate || ''} />
            </Field>
            <Field>
              <label className="label">FB Share Body</label>
              <Textarea name='shareContentTemplate' value={this.props.quiz.shareContentTemplate} onChange={this.handleContentChange.bind(this)} />
            </Field>
            <Field>
              <ImageUpload quizId={this.props.quiz.id}  objectKey={'share'} saveImage={ this.props.saveShareImage } image={this.props.quiz.shareImagePath} />
            </Field>
          </div>
        </div>

        <div className='section update-box'>
          <div className='buttons'>
            <CopyToClipboard text={ this.output() }>
              <button className='button' onClick={this.handleCopy.bind(this)}>{this.state.copyButton}</button>
            </CopyToClipboard>
            <button className={`button ${isSaving}`} onClick={this.handleSave.bind(this)}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    quiz: state.quiz,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchQuiz,
    createQuestion,
    updateTitle,
    updateSubTitle,
    updateActionSlug,
    updateQuizContent,
    saveQuiz,
    saveShareImage,
    saveIntroImage,
    saveQuizImage,
    newQuizLoaded,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizMaker);
