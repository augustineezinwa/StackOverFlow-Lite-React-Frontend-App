import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from '../actions/actionTypes';
import initialState from '../store/initialState';

const { profile } = initialState;

const profileReducer = (state = profile, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROFILE_SUCCESS:
      return { ...state, data: payload.data || payload, errors: {} };
    case FETCH_PROFILE_FAILURE:
      return { ...state, errors: payload || {} };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, data: payload.data || payload, errors: {} };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, errors: payload || {} };
    default:
      return state;
  }
};

export default profileReducer;
