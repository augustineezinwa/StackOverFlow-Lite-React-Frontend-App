import { LOADING_FALSE, LOADING_TRUE } from '../actions/actionTypes';

import initialState from '../store/initialState';

const { loader } = initialState;

const loaderReducer = (state = loader, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING_FALSE:
      return { ...state, ...payload };
    case LOADING_TRUE:
      return { ...state, ...payload }
    default:
      return state;
  }
};

export default loaderReducer;
