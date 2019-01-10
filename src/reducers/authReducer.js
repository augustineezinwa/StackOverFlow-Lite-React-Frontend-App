import { AUTH_USER_FAILURE, AUTH_USER_SUCCESS, AUTH_USER_LOGOUT } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { auth } = initialState;

const authReducer = (state = auth, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_USER_LOGOUT:
    return { ...state, ...payload };
    case AUTH_USER_FAILURE:
      return { ...state, ...payload };
    case AUTH_USER_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default authReducer;
