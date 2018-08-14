import {
  LOAD_QUIZ,
  UPDATE_QUIZ_CONTENT,
  SAVE_SHARE_IMAGE,
  SAVE_INTRO_IMAGE,
  SAVE_QUIZ_IMAGE,
} from '../actions/index';

const defaultState = {
  id: '',
  questions: [],
  title: null,
  subtitle: null,
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
};

const quiz = function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_QUIZ_CONTENT:
      return {
        ...state,
        [action.payload.name]: action.payload.content,
      };
    case SAVE_SHARE_IMAGE:
      return {
        ...state,
        shareImagePath: action.payload.path,
      };
    case SAVE_INTRO_IMAGE:
      return {
        ...state,
        introImagePath: action.payload.path,
      };
    case SAVE_QUIZ_IMAGE:
      return {
        ...state,
        [action.payload.section]: action.payload.path,
      };
    case LOAD_QUIZ:
      return action.payload;
    default:
      return state;
  }
};

export default quiz;
