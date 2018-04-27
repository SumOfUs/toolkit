import React from 'react';

const Answer = ({ setCorrectAnswer, deleteAnswer, text, correct }) => {

  return(
    <li>
      <span onClick={setCorrectAnswer}>{text}</span> - { correct ? 'correct' : 'incorrect' }
      <span onClick={deleteAnswer}>[del]</span>
    </li>
  )
};

export default Answer;
