import React from 'react';

const makeCorrectAnswer = e => {
  console.log(e.target);
}

const Answer = ({ setCorrectAnswer, deleteAnswer, text, correct }) => {

  return(
    <li>
      <span onClick={setCorrectAnswer}>{text}</span> - { correct ? 'correct' : 'incorrect' }
      <span onClick={deleteAnswer}>[del]</span>
    </li>
  )
};

export default Answer;
