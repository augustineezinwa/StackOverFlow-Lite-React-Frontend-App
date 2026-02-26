/**
 * Answer vote API.
 * PUT /questions/{questionId}/answers/{answerId}/upvote
 * PUT /questions/{questionId}/answers/{answerId}/downvote
 */

import obtainToken from '../utils/obtainToken';
import { authFetch } from '../utils/apiClient';
import sendNotification from './notificationsActions';

const BASE = process.env.APP_BASE_URL;

function voteAnswer(questionId, answerId, voteType) {
  const path = voteType === 'upvote' ? 'upvote' : 'downvote';
  const url = `${BASE}/questions/${questionId}/answers/${answerId}/${path}`;
  return (dispatch) => authFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: obtainToken()
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'fail') {
        if (data.message && data.message.toLowerCase().includes('token')) {
          dispatch(sendNotification(true, 'Please log in to vote.'));
        } else {
          dispatch(sendNotification(true, data.message || 'Vote failed.'));
        }
        return Promise.reject(new Error(data.message || 'Vote failed'));
      }
      return data;
    })
    .catch((err) => {
      dispatch(sendNotification(true, 'Vote failed. Please try again.'));
      return Promise.reject(err);
    });
}

export const upvoteAnswer = (questionId, answerId) =>
  voteAnswer(questionId, answerId, 'upvote');

export const downvoteAnswer = (questionId, answerId) =>
  voteAnswer(questionId, answerId, 'downvote');
