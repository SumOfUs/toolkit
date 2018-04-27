import { combineReducers } from 'redux';
import Questions from './questions';
import Quiz from './quiz';
import Control from './control';
import Quizzes from './quizzes';

const rootReducer = combineReducers({
  questions: Questions,
  quiz: Quiz,
  control: Control,
  quizzes: Quizzes,
});

export default rootReducer;
