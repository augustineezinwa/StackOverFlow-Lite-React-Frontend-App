import { FETCH_USER_QUESTIONS_SUCCESS, FETCH_USER_QUESTIONS_FAILURE, USER_QUESTIONS_LOADING_MORE } from './actionTypes';
import appLoader from './loaderActions';
import obtainToken from '../utils/obtainToken';
import { authFetch } from '../utils/apiClient';
import sendNotification from './notificationsActions';
import { authUserLogout } from './authUserActions';

const BASE = process.env.APP_BASE_URL;
const DEFAULT_LIMIT = 10;

export const fetchUserQuestionsSuccess = (data, append = false, nextCursor = null, hasMore = true) => ({
  type: FETCH_USER_QUESTIONS_SUCCESS,
  payload: { data, append, nextCursor, hasMore }
});

export const fetchUserQuestionsFailure = (errors) => ({
  type: FETCH_USER_QUESTIONS_FAILURE,
  payload: errors
});

export const fetchUserQuestions = ({ limit = DEFAULT_LIMIT, cursor, append = false } = {}) => (dispatch) => {
  const token = obtainToken();
  if (!token) {
    dispatch(sendNotification(true, 'Session expired. Please log in again.'));
    dispatch(authUserLogout());
    if (typeof window !== 'undefined' && window.location && window.location.pathname !== '/') {
      window.location.href = '/';
    }
    return Promise.resolve();
  }
  if (append) {
    dispatch({ type: USER_QUESTIONS_LOADING_MORE, payload: true });
  } else {
    dispatch(appLoader(true, 'Loading your questions...'));
  }
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  if (cursor != null && cursor !== '') {
    params.set('cursor', String(cursor));
  }
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const url = `${BASE}/users/questions${queryString}`;
  return authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (append) dispatch({ type: USER_QUESTIONS_LOADING_MORE, payload: false });
      else dispatch(appLoader(false, ''));
      if (data.status === 'success' && data.data) {
        const list = data.data.questions || data.data;
        const arr = Array.isArray(list) ? list : [];
        const nextCursorFromApi = data.data && (data.data.nextCursor != null ? data.data.nextCursor : data.data.cursor);
        const lastId = arr.length > 0 && arr[arr.length - 1].id != null ? arr[arr.length - 1].id : null;
        const nextCursor = nextCursorFromApi != null ? nextCursorFromApi : lastId;
        const hasMore = data.data && (data.data.hasMore != null ? data.data.hasMore : arr.length >= limit);
        dispatch(fetchUserQuestionsSuccess(arr, append, nextCursor, hasMore));
      }
      if (data.status === 'fail') {
        dispatch(fetchUserQuestionsFailure(data.message || data.error || {}));
      }
    })
    .catch((err) => {
      if (append) dispatch({ type: USER_QUESTIONS_LOADING_MORE, payload: false });
      else dispatch(appLoader(false, ''));
      dispatch(fetchUserQuestionsFailure(err.message || {}));
    });
};
