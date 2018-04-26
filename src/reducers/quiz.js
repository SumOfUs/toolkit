import {
  LOAD_QUIZ,
  UPDATE_TITLE,
  UPDATE_ACTION_SLUG,
  UPDATE_SUBTITLE,
  UPDATE_QUIZ_CONTENT,
  SAVE_SHARE_IMAGE,
  SAVE_INTRO_IMAGE,
  SAVE_QUIZ_IMAGE,
  SAVED_QUIZ,
  SAVING_QUIZ,
 } from '../actions/index';

 const defaultState = {
   id: '',
   questions: [],
   title: null,
   subtitle: null,
   saving: false,
   postQuizTitle: '',
   postQuizMessage: '',
   scoreTemplate: '',
   shareContentTemplate: '',
   shareTitleTemplate: '',
   shareImagePath: '',
   introImagePath: '',
   callToActionImagePath: '',
   callToShareImagePath: '',
   scoreImagePath: '',
   actionImagePath: '',
   actionSlug: '',
   actionText: '',
   changesPending: false,
 }

const quiz = function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_ACTION_SLUG:
      return {
        ...state, actionSlug: action.payload
      }
    case SAVED_QUIZ:
      return {
        ...state, saving: false
      }
    case SAVING_QUIZ:
      return {
        ...state, saving: true
      }
    case UPDATE_TITLE:
      return {
        ...state, title: action.payload
      }
    case UPDATE_SUBTITLE:
      return {
        ...state, subtitle: action.payload
      }
    case UPDATE_QUIZ_CONTENT:
      return {
        ...state, [action.payload.name]: action.payload.content
      }

    case SAVE_SHARE_IMAGE:
      return {
        ...state, shareImagePath: action.payload.path
      }
    case SAVE_INTRO_IMAGE:
      return {
        ...state, introImagePath: action.payload.path
      }
    case SAVE_QUIZ_IMAGE:
      console.log("PAYLOAD:", action.payload);
      return {
        ...state, [action.payload.section]: action.payload.path
      }
    case LOAD_QUIZ:
      console.log("reducer payload", action.payload);
      return action.payload;
      break;

    default:
  }
  return state;
}

export default quiz;
