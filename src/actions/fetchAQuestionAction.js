import { FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE } from './actionTypes';
import appLoader from './loaderActions';
import sendNotification from './notificationsActions';

export const fetchAQuestionSuccess = data => ({
  type: FETCH_QUESTION_SUCCESS, payload: { data }
});

export const fetchAQuestonFailure = errors => ({
  type: FETCH_QUESTION_FAILURE, payload: { errors }
});

export const fetchAQuestion = (id, history) => (dispatch) => {
  dispatch(appLoader(true, 'Loading question'));
  return fetch(`${process.env.APP_BASE_URL}/questions/${id}`)
    .then(res => res.json(), err => dispatch(appLoader(false, err.message)))
    .then((data) => {
      if (data.status === 'success') {
        dispatch(appLoader(false, ''));
        dispatch(fetchAQuestionSuccess(data.data.question));
      }
      if (data.status === 'fail') {
        dispatch(sendNotification(true, 'we cant find the question you are looking for'));
        return history.push('/');
      }
    });
};
