
import { NOTIFY_USER_FALSE, NOTIFY_USER_TRUE } from './actionTypes';

const sendNotifications = (status = false, message = '') => {
  if (status) {
    return {
      type: NOTIFY_USER_TRUE,
      payload: {
        status: true,
        message
      }
    };
  }
  return {
    type: NOTIFY_USER_FALSE,
    payload: {
      status: false,
      message: ''
    }
  }
};

export default sendNotifications;
