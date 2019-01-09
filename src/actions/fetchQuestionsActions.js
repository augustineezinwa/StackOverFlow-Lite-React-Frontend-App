import { FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAILURE } from './actionTypes';
import appLoader from './loaderActions';

export const fetchQuestionSuccess = data => ({
  type: FETCH_QUESTIONS_SUCCESS, payload: { data }
});

export const fetchQuestonFailure = errors => ({
  type: FETCH_QUESTIONS_FAILURE, payload: { errors }
});

export const fetchQuestions = () => (dispatch) => {
  dispatch(appLoader(true, 'Loading StackOverFlow-Lite'));
  return fetch(`${process.env.APP_BASE_URL}/questions`)
    .then(res => res.json(), err => dispatch(appLoader(false, err.message)))
    .then((data) => {
      if (data.status === 'success') {
        dispatch(appLoader(false, ''));
        dispatch(fetchQuestionSuccess(data.data.questions));
      }
    });
};
