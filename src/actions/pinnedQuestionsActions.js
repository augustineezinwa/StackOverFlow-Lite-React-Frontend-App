import {
  FETCH_PINNED_QUESTIONS_SUCCESS,
  FETCH_PINNED_QUESTIONS_FAILURE,
  QUESTION_ARCHIVED
} from './actionTypes';
import obtainToken from '../utils/obtainToken';
import { authFetch } from '../utils/apiClient';
import sendNotification from './notificationsActions';
import { authUserLogout } from './authUserActions';

const BASE = process.env.APP_BASE_URL;

export const fetchPinnedQuestionsSuccess = (data) => ({
  type: FETCH_PINNED_QUESTIONS_SUCCESS,
  payload: { data }
});

export const fetchPinnedQuestionsFailure = (error) => ({
  type: FETCH_PINNED_QUESTIONS_FAILURE,
  payload: error
});

export const fetchPinnedQuestions = () => (dispatch) => {
  const token = obtainToken();
  if (!token) {
    return Promise.resolve();
  }
  const url = `${BASE}/users/questions/pinned`;
  return authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success' && data.data != null) {
        const list = data.data.questions || data.data;
        const arr = Array.isArray(list) ? list : [];
        dispatch(fetchPinnedQuestionsSuccess(arr));
      } else {
        dispatch(fetchPinnedQuestionsFailure(data.message || 'Failed to load pinned'));
      }
    })
    .catch((err) => {
      dispatch(fetchPinnedQuestionsFailure(err.message || 'Failed to load pinned'));
    });
};

export const pinOrUnpinQuestion = (questionId, pinned) => (dispatch) => {
  const token = obtainToken();
  if (!token) {
    dispatch(sendNotification(true, 'Please log in to pin questions.'));
    return Promise.resolve();
  }
  const url = `${BASE}/questions/${questionId}/pin`;
  return authFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify({ pinned })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        dispatch(fetchPinnedQuestions());
      } else {
        dispatch(sendNotification(true, data.message || 'Failed to update pin.'));
      }
    })
    .catch(() => {
      dispatch(sendNotification(true, 'Failed to update pin.'));
    });
};

export const archiveQuestion = (questionId, archived) => (dispatch) => {
  const token = obtainToken();
  if (!token) {
    dispatch(sendNotification(true, 'Please log in to archive questions.'));
    return Promise.resolve();
  }
  const url = `${BASE}/questions/${questionId}/archive`;
  return authFetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify({ archived })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success' && archived) {
        dispatch({ type: QUESTION_ARCHIVED, payload: questionId });
      } else if (data.status !== 'success') {
        dispatch(sendNotification(true, data.message || 'Failed to archive.'));
      }
    })
    .catch(() => {
      dispatch(sendNotification(true, 'Failed to archive.'));
    });
};
