import { POST_ANSWER_FAILURE, POST_ANSWER_SUCCESS } from './actionTypes';
import appLoader from './loaderActions';
import sendNotification from './notificationsActions';
import obtainToken from '../utils/obtainToken';

export const postAnswerSuccess = data => ({
  type: POST_ANSWER_SUCCESS, payload: { data }
});

export const postAnswerFailure = errors => ({
  type: POST_ANSWER_FAILURE, payload: { errors }
});

export const postAnswer = (questionId, answer) => (dispatch) => {
  dispatch(appLoader(true, 'We are sending in your answer'));
  return fetch(`${process.env.APP_BASE_URL}/questions/${questionId}/answers`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: obtainToken()
    },
    body: JSON.stringify({
      answer
    })
  })
    .then(res => res.json(), err => dispatch(appLoader(false, err.message)))
    .then((data) => {
      if (data.status === 'success') {
        dispatch(appLoader(false, ''));
        dispatch(postAnswerSuccess(data.data.newAnswer));
      }
      if (data.status === 'fail') {
        dispatch(appLoader(false, ''));
        if (data.message.includes('token')) {
          dispatch(sendNotification(true, 'please login to post an answer'));
        } else {
          dispatch(sendNotification(true, data.message));
        }
        dispatch(postAnswerFailure(data.message));
      }
    });
};
