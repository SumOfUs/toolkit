import { combineReducers } from 'redux';
import Questions from './questions';
import Quiz from './quiz';
import Quizzes from './quizzes';

const rootReducer = combineReducers({
  questions: Questions,
  quiz: Quiz,
  quizzes: Quizzes
});

export default rootReducer;
