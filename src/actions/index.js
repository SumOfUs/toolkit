import axios from 'axios';
export const FETCH_QUIZ = 'FETCH_QUIZ';
export const FETCH_QUIZZES = 'FETCH_QUIZZES';
export const CREATE_ANSWER = 'CREATE_ANSWER';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUIZ = 'CREATE_QUIZ';
export const NEW_QUIZ_CREATED = 'NEW_QUIZ_CREATED';
export const NEW_QUIZ_LOADED = 'NEW_QUIZ_LOADED';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const SAVE_SHARE_IMAGE = 'SAVE_SHARE_IMAGE';
export const SAVE_INTRO_IMAGE = 'SAVE_INTRO_IMAGE';
export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';
export const DELETE_ANSWER = 'DELETE_ANSWER';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const UPDATE_QUIZ_CONTENT = 'UPDATE_QUIZ_CONTENT';
export const LOAD_QUIZ = 'LOAD_QUIZ';
export const LOAD_QUIZZES = 'LOAD_QUIZZES';
export const SAVED_QUIZ = 'SAVED_QUIZ';
export const SAVING_QUIZ = 'SAVING_QUIZ';
export const SAVE_QUIZ_IMAGE = 'SAVE_QUIZ_IMAGE';

const uri = `https://a6niv79zai.execute-api.us-west-2.amazonaws.com/dev/quizmaker`;

export const loadQuiz = (quiz) => {
  return {
    type: LOAD_QUIZ,
    payload: quiz
  }
}

export const loadQuizzes = (quizzes) => {
  return {
    type: LOAD_QUIZZES,
    payload: quizzes
  }
};

export const savingQuiz = () => {
  return {
    type: SAVING_QUIZ,
    payload: null
  }
};

export const fetchQuiz = (id) => {
  const promise = axios.get(`${uri}/${id}`);

  return dispatch => {
    promise
      .then( resp => {
        dispatch(loadQuiz(resp.data.Item))
      })
      .catch( e => console.log("error", e))
  }
}

export const newQuizCreated = (id) => {
  return {
    type: NEW_QUIZ_CREATED,
    payload: id
  }
}

export const newQuizLoaded = () => {
  return {
    type: NEW_QUIZ_LOADED,
    payload: null
  }
}

export const createQuiz = (title) => {
  const promise = axios.put(uri, {title: title});

  return dispatch => {
    promise
      .then( resp => {
        dispatch(newQuizCreated(resp.data.id))
      })
      .catch( e => console.log("error", e))
  }
}

export const fetchQuizzes = () => {
  const promise = axios.get(uri);

  return dispatch => {
    promise
      .then( resp => {
        dispatch(loadQuizzes(resp.data))
      })
      .catch( e => console.log("error", e))
  }
}

export const savedQuiz = (quiz) => {
  return {
    type: SAVED_QUIZ,
    payload: quiz
  }
}

export const saveQuiz = () => {
  return (dispatch, getState) => {

    dispatch(savingQuiz());
    let state = getState();

    state = Object.assign({}, state.quiz, {questions: state.questions});
    const promise = axios.put(uri, state);

    promise
      .then( resp => {
        dispatch(savedQuiz());
      });
  }
}

export const createAnswer = (answer) => {
  return {
    type: CREATE_ANSWER,
    payload: answer
  }
}

export const deleteAnswer = (questionId, answerIndex) => {
  return {
    type: DELETE_ANSWER,
    payload: {questionId, answerIndex}
  }
}

export const createQuestion = (question) => {
  return {
    type: CREATE_QUESTION,
    payload: question
  }
}

export const deleteQuestion = (question) => {
  return {
    type: DELETE_QUESTION,
    payload: question
  }
}

export const saveImage = (data) => {
  return {
    type: SAVE_IMAGE,
    payload: data
  }
}

export const saveQuizImage = (data) => {
  return {
    type: SAVE_QUIZ_IMAGE,
    payload: data
  }
}

export const saveShareImage = (data) => {
  return {
    type: SAVE_SHARE_IMAGE,
    payload: data
  }
}

export const saveIntroImage = (data) => {
  return {
    type: SAVE_INTRO_IMAGE,
    payload: data
  }
}

const update = data => (
  {
    type: UPDATE_QUIZ_CONTENT,
    payload: data,
  }
)

export const updateQuizContent = (data, state) => {
  return (dispatch, state) => {
    console.log(state());
    dispatch(update(data));
  }
}

export const setCorrectAnswer = (questionId, answerIndex) => {
  return {
    type: SET_CORRECT_ANSWER,
    payload: {questionId, answerIndex}
  }
}
