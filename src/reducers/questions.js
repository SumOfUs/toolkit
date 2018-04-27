import uuid from 'uuid/v1';

import {
  FETCH_QUIZ,
  CREATE_ANSWER,
  CREATE_QUESTION,
  SET_CORRECT_ANSWER,
  DELETE_ANSWER,
  DELETE_QUESTION,
  SAVE_IMAGE,
  LOAD_QUIZ
 } from '../actions/index';

 const initialState = {
   questions: [],
   title: null,
   subtitle: null,
 };

 const answers = (state = initialState, action) => {
   switch (action.type) {
     case SET_CORRECT_ANSWER:
      return state.map( (answer, i) => ({
        ...answer,
        correct: i === action.payload.answerIndex
      }))

    case DELETE_ANSWER:
     return state.filter( (answer, i) => {
       if(i !== action.payload.answerIndex) {
         return answer
       }
     })

     default:
       return state;
   }
 };

const question = (state = {}, action) => {
  switch (action.type) {
    case SET_CORRECT_ANSWER:
      return state.id === action.payload.questionId ? {
        ...state,
        answers: answers(state.answers, action)
      } : state;

    case DELETE_ANSWER:
      return state.id === action.payload.questionId ? {
        ...state,
        answers: answers(state.answers, action)
      } : state;
    default:
      return state;
  }
};

const questions = function(state = [], action) {
  switch (action.type) {
    case LOAD_QUIZ:
      return action.payload.questions || [];
      break;

    case DELETE_QUESTION:
      return state.filter( question => question.id !== action.payload);

    case SAVE_IMAGE:
      return state.map( question => {

        if(question.id === action.payload.id)
          question.image = action.payload.path;

        return question;
      });

    case CREATE_QUESTION:
      return [{
        id: uuid(),
        correct: false,
        question: action.payload.text,
        image: null,
        answers: []
      }, ...state];

    case SET_CORRECT_ANSWER:
      return state.map( q => question(q, action) )
    case DELETE_ANSWER:
      return state.map( q => question(q, action) )

    case CREATE_ANSWER:
      var questions = state.map( question => {
        if(question.id === action.payload.id) {
          question.answers = [...question.answers, {correct: false, text: action.payload.text}];
          return question;
        } else {
          return question;
        }
      });

      return questions
    default:

  }
  return state;
}


export default questions;
