import { NOTIFY_USER_FALSE, NOTIFY_USER_TRUE } from '../actions/actionTypes';

import initialState from '../store/initialState';

const { notifications } = initialState;

const notificationsReducer = (state = notifications, action) => {
  const { type, payload } = action;
  switch (type) {
    case NOTIFY_USER_TRUE:
      return { ...state, ...payload };
    case NOTIFY_USER_FALSE:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export default notificationsReducer;
