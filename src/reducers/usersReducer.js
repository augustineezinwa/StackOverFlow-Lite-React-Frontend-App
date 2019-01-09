import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { users } = initialState;

const usersReducer = (state = users, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USERS_FAILURE:
      return { ...state, ...payload };
    case FETCH_USERS_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default usersReducer;
