import { FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAILURE } from './actionTypes';
import appLoader from './loaderActions';

export const fetchQuestionSuccess = (data, append = false) => ({
  type: FETCH_QUESTIONS_SUCCESS, payload: { data, append }
});

export const fetchQuestonFailure = errors => ({
  type: FETCH_QUESTIONS_FAILURE, payload: { errors }
});

export const fetchQuestions = ({ page, limit, append = false } = {}) => (dispatch) => {
  dispatch(appLoader(true, 'Loading StackOverFlow-Lite'));
  const hasPaginationParams = Number.isInteger(page) && Number.isInteger(limit);
  const queryString = hasPaginationParams ? `?page=${page}&limit=${limit}` : '';
  return fetch(`${process.env.APP_BASE_URL}/questions${queryString}`)
    .then(res => res.json(), err => dispatch(appLoader(false, err.message)))
    .then((data) => {
      if (data.status === 'success') {
        const questionData = data.data && Array.isArray(data.data.questions) ? data.data.questions : [];
        dispatch(appLoader(false, ''));
        dispatch(fetchQuestionSuccess(questionData, append));
        return questionData;
      }
      dispatch(appLoader(false, ''));
      return [];
    });
};
