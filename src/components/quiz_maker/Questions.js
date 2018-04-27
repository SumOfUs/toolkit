import React from 'react';
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
