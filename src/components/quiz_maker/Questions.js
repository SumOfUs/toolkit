import React, { Component } from 'react';
import { Field, Input, Button, Textarea } from 'reactbulma'
import { connect } from 'react-redux';
import { createAnswer } from '../../actions/index';
import { bindActionCreators } from 'redux';
import Question from '../../containers/Question'

const Questions = (props) => {
  const markup = props.questions.map( (question, i) => <Question quizId={props.quizId} key={i} {...question} /> )

  return(
    <div>
      { markup }
    </div>
  )
}

export default Questions;
