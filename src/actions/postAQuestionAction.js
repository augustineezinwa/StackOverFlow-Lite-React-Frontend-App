import { POST_QUESTION_SUCCESS, POST_QUESTION_FAILURE } from './actionTypes';
import appLoader from './loaderActions';
import sendNotification from './notificationsActions';
import obtainToken from '../utils/obtainToken';

export const postQuestionSuccess = data => ({
  type: POST_QUESTION_SUCCESS, payload: { data }
});

export const postQuestionFailure = errors => ({
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
        dispatch(postQuestionSuccess(data.data.newQuestion));
        history.push('/');
      }
      if (data.status === 'fail') {
        dispatch(appLoader(false, ''));
        if (data.message.includes('token')) {
          dispatch(sendNotification(true, 'please login to post a question'));
        } else {
          dispatch(sendNotification(true, data.message));
        }
        dispatch(postQuestionFailure(data.message));
      }
    });
};
