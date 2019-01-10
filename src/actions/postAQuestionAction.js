import { POST_QUESTION_SUCCESS, POST_QUESTION_FAILURE } from './actionTypes';
import appLoader from './loaderActions';
import sendNotification from './notificationsActions';
import obtainToken from '../utils/obtainToken';

export const fetchAQuestionSuccess = data => ({
  type: POST_QUESTION_SUCCESS, payload: { data }
});

export const fetchAQuestonFailure = errors => ({
  type: POST_QUESTION_FAILURE, payload: { errors }
});

export const postAQuestion = (questionTitle, questionDescription, history) => (dispatch) => {
  dispatch(appLoader(true, 'We are sending in your question'));
  return fetch(`${process.env.APP_BASE_URL}/questions`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: obtainToken()
    },
    body: JSON.stringify({
      questionTitle,
      questionDescription,
    })
  })
    .then(res => res.json(), err => dispatch(appLoader(false, err.message)))
    .then((data) => {
      if (data.status === 'success') {
        dispatch(appLoader(false, ''));
        history.push('/');
      }
      if (data.status === 'fail') {
        dispatch(appLoader(false, ''));
        dispatch(sendNotification(true, data.message));
      }
    });
};