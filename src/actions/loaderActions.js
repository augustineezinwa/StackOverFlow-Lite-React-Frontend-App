import { LOADING_FALSE, LOADING_TRUE } from './actionTypes';

const appLoader = (isLoading = false, message = '') => {
  if (isLoading) {
    return {
      type: LOADING_TRUE,
      payload: {
        isLoading,
        message
      }
    };
  }
  return {
    type: LOADING_FALSE,
    payload: {
      isLoading: false,
      message: ''
    }
  }
};

export default appLoader;
