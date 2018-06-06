import {
  LOAD_QUIZZES,
  NEW_QUIZ_CREATED,
  NEW_QUIZ_LOADED,
} from '../actions/index';

const defaultState = {
  quizzes: [],
  new_quiz: null,
};

const quizzes = function(state = defaultState, action) {
  switch (action.type) {
    case LOAD_QUIZZES:
      return { ...state, quizzes: action.payload };
    case NEW_QUIZ_CREATED:
      return { ...state, new_quiz: action.payload };
    case NEW_QUIZ_LOADED:
      return { ...state, new_quiz: null };
    default:
      return state;
  }
};

export default quizzes;
