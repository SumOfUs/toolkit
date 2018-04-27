import {
  SAVED_QUIZ,
  SAVING_QUIZ,
 } from '../actions/index';

 const defaultState = {
   saving: false
 };

const control = function(state = defaultState, action) {

  switch (action.type) {
    case SAVED_QUIZ:
      return {
        ...state, saving: false
      }
    case SAVING_QUIZ:
      return {
        ...state, saving: true
      }
    default:
  }
  return state;
}

export default control;
