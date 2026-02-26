/**
 * Comments API for answers.
 * GET /questions/{questionId}/answers/{answerId} - get answer with all comments
 * POST /questions/{questionId}/answers/{answerId}/comments - add a comment
 * @see https://stack-o-lite.netlify.app/docs
 */

import obtainToken from '../utils/obtainToken';
import { authFetch } from '../utils/apiClient';
import sendNotification from './notificationsActions';

const BASE = process.env.APP_BASE_URL;

/**
 * Fetches a single answer with its comments.
 * @param {string|number} questionId
 * @param {string|number} answerId
 * @returns {Promise<{ comments: Array }>} resolves with { answer, comments }
 */
export function fetchAnswerWithComments(questionId, answerId) {
  const url = `${BASE}/questions/${questionId}/answers/${answerId}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.status !== 'success' || !data.data) {
        return { answer: null, comments: [] };
      }
      const payload = data.data;
      const answerObj = payload.answer || payload;
      // Comments may be at payload.comments, payload.comment, or answer.comments
      let raw = payload.comments || payload.comment || answerObj.comments || answerObj.comment;
      if (!Array.isArray(raw)) raw = [];
      const comments = raw.map((c) => (typeof c === 'string' ? { comment: c } : c));
      return {
        answer: answerObj,
        comments
      };
    })
    .catch(() => ({ answer: null, comments: [] }));
}

/**
 * Posts a comment on an answer. Requires auth.
 * @param {string|number} questionId
 * @param {string|number} answerId
 * @param {string} commentBody - plain text or HTML comment
 * @param {Function} dispatch - Redux dispatch for notifications
 * @returns {Promise<{ ok: boolean, comment?: object }>} { ok, comment } if success
 */
export function postComment(questionId, answerId, commentBody, dispatch) {
  const token = obtainToken();
  if (!token) {
    if (dispatch) dispatch(sendNotification(true, 'Please log in to add a comment.'));
    return Promise.resolve({ ok: false, comment: null });
  }
  const url = `${BASE}/questions/${questionId}/answers/${answerId}/comments`;
  return authFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify({ comment: commentBody })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'success') {
        const newComment = data.data && (data.data.comment || data.data);
        return { ok: true, comment: newComment };
      }
      if (dispatch && data.message) {
        dispatch(sendNotification(true, data.message));
      }
      return { ok: false, comment: null };
    })
    .catch(() => {
      if (dispatch) dispatch(sendNotification(true, 'Failed to add comment.'));
      return { ok: false, comment: null };
    });
}
