/**
 * Centralized API client that intercepts 401 responses and logs the user out.
 * Use authFetch() for any request that sends the authorization header.
 */

import { authUserLogout } from '../actions/authUserActions';
import sendNotification from '../actions/notificationsActions';

let storeRef = null;

export function setStore(store) {
  storeRef = store;
}

function hasAuthHeader(options) {
  if (!options || !options.headers) return false;
  const h = options.headers;
  // Treat presence of the header (not its truthy value) as an authenticated request.
  // This ensures that even an expired/empty token still triggers logout on 401.
  return Object.prototype.hasOwnProperty.call(h, 'authorization')
    || Object.prototype.hasOwnProperty.call(h, 'Authorization');
}

export function authFetch(url, options = {}) {
  return fetch(url, options).then((response) => {
    if (response.status === 401 && hasAuthHeader(options)) {
      if (storeRef && typeof storeRef.dispatch === 'function') {
        storeRef.dispatch(sendNotification(true, 'Session expired. Please log in again.'));
        storeRef.dispatch(authUserLogout());
        if (typeof window !== 'undefined' && window.location && window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }
    return response;
  });
}
