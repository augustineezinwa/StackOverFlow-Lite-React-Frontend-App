import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './actionTypes';
import appLoader from './loaderActions';

export const fetchUserSuccess = data => ({
  type: FETCH_USERS_SUCCESS, payload: { data }
});

export const fetchUserFailure = errors => ({
  type: FETCH_USERS_FAILURE, payload: { errors }
});

export const fetchUsers = () => (dispatch) => {
  dispatch(appLoader(true, 'Loading data...'));
  return fetch(`${process.env.APP_BASE_URL}/users`)
    .then(res => res.json(), err => dispatch(appLoader(false, err.message)))
    .then((data) => {
      if (data.status === 'success') {
        dispatch(appLoader(false, ''));
        dispatch(fetchUserSuccess(data.data.users));
      }
      if (data.status === 'fail') {
        dispatch(appLoader(true, 'we cant find this data'));
      }
    });
};
