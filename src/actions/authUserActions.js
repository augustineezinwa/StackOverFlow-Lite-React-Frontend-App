import { AUTH_USER_SUCCESS, AUTH_USER_FAILURE } from './actionTypes';
import appLoader from './loaderActions';
import sendNotification from './notificationsActions';

export const authUserSuccess = data => ({
  type: AUTH_USER_SUCCESS, payload: { isLoggedIn: data }
});

export const authUserFailure = errors => ({
  type: AUTH_USER_FAILURE, payload: { errors }
});

export const authUser = (firstName, lastName, email, password, confirmPassword, history) => (dispatch) => {
  dispatch(appLoader(true, 'Wait.. while we sign you up'));
  return fetch(`${process.env.APP_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    })
  })
    .then(res => res.json(), err => dispatch(appLoader(false, err.message)))
    .then((data) => {
      if (data.status === 'success') {
        dispatch(appLoader(false, ''));
        dispatch(authUserSuccess(true));
        localStorage.setItem('user', JSON.stringify(data.data));
        dispatch(sendNotification(true, data.message))
        history.push('/');
      }
      if (data.status === 'fail') {
        dispatch(appLoader(false));
        dispatch(sendNotification(true, data.message));
      }
    });
};
