import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Answer from '../components/quiz_maker/Answer';
import NewAnswer from './NewAnswer';
import ImageUpload from './ImageUpload';
import {
  setCorrectAnswer,
  deleteAnswer,
  deleteQuestion,
  saveImage,
  saveQuiz,
} from '../actions/index';

class Question extends Component {
  deleteQuestion(id) {
    this.props.deleteQuestion(id);
    this.props.saveQuiz();
  }

  render() {
    const answers = this.props.answers.map((answer, i) => (
      <Answer
        setCorrectAnswer={() => {
          this.props.setCorrectAnswer(this.props.id, i);
          this.props.saveQuiz();
        }}
        deleteAnswer={() => {
          this.props.deleteAnswer(this.props.id, i);
          this.props.saveQuiz();
        }}
        key={i}
        {...answer}
      />
    ));

    return (
      <div className="box">
        <div className="media">
          <div className="media-left">
            <ImageUpload
              quizId={this.props.quizId}
              objectKey={`question/${this.props.id}`}
              id={this.props.id}
              saveImage={this.props.saveImage}
              image={this.props.image}
            />
          </div>
          <div className="media-content">
            <div className="content">
              <h1 className="title is-2">
                <span onClick={this.deleteQuestion.bind(this, this.props.id)}>
                  [del]
                </span>{' '}
                {this.props.question}
              </h1>
              <ul>{answers}</ul>
              <NewAnswer questionId={this.props.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setCorrectAnswer,
      deleteAnswer,
      deleteQuestion,
      saveImage,
      saveQuiz,
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Question);
