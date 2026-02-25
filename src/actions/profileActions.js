import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from './actionTypes';
import appLoader from './loaderActions';
import sendNotification from './notificationsActions';
import obtainToken from '../utils/obtainToken';
import { authFetch } from '../utils/apiClient';
import { authUserLogout } from './authUserActions';

const BASE = process.env.APP_BASE_URL;

export const fetchProfileSuccess = (data) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: { data }
});

export const fetchProfileFailure = (errors) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: errors
});

export const updateProfileSuccess = (data) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: { data }
});

export const updateProfileFailure = (errors) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: errors
});

export const fetchProfile = () => (dispatch) => {
  const token = obtainToken();
  if (!token) {
    dispatch(sendNotification(true, 'Session expired. Please log in again.'));
    dispatch(authUserLogout());
    if (typeof window !== 'undefined' && window.location && window.location.pathname !== '/') {
      window.location.href = '/';
    }
    return Promise.resolve();
  }
  dispatch(appLoader(true, 'Loading profile...'));
  return authFetch(`${BASE}/users/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(appLoader(false, ''));
      if (data.status === 'success' && data.data) {
        const profile = data.data.users || data.data.profile || data.data;
        dispatch(fetchProfileSuccess(profile));
      }
      if (data.status === 'fail') {
        dispatch(fetchProfileFailure(data.message || data.error || {}));
      }
    })
    .catch((err) => {
      dispatch(appLoader(false, ''));
      dispatch(fetchProfileFailure(err.message || {}));
    });
};

/**
 * PUT /api/v1/users
 * Body: fullName, jobRole, photo, company (user said job, jobRole, photo, company - sending jobRole, photo, company; add fullName for name)
 */
export const updateProfile = (payload) => (dispatch) => {
  const token = obtainToken();
  if (!token) {
    dispatch(sendNotification(true, 'Session expired. Please log in again.'));
    dispatch(authUserLogout());
    if (typeof window !== 'undefined' && window.location && window.location.pathname !== '/') {
      window.location.href = '/';
    }
    return Promise.resolve();
  }
  const body = {};
  if (payload.fullName != null) body.fullName = payload.fullName;
  if (payload.jobRole != null) body.jobRole = payload.jobRole;
  if (payload.company != null) body.company = payload.company;
  if (payload.photo != null) body.photo = payload.photo;
  if (payload.job != null) body.job = payload.job;

  dispatch(appLoader(true, 'Updating profile...'));
  return authFetch(`${BASE}/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(appLoader(false, ''));
      if (data.status === 'success' && data.data) {
        const updated = data.data.user || data.data.profile || data.data;
        dispatch(updateProfileSuccess(updated));
        dispatch(sendNotification(true, data.message || 'Profile updated'));
      }
      if (data.status === 'fail') {
        dispatch(sendNotification(true, data.message || 'Update failed'));
        dispatch(updateProfileFailure(data.message || data.error || {}));
      }
    })
    .catch((err) => {
      dispatch(appLoader(false, ''));
      dispatch(sendNotification(true, err.message || 'Update failed'));
      dispatch(updateProfileFailure(err.message || {}));
    });
};
