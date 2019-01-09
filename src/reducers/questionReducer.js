
import { FETCH_QUESTION_FAILURE, FETCH_QUESTION_SUCCESS } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { question } = initialState;

const questionReducer = (state = question, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_QUESTION_FAILURE:
      return { ...state, ...payload };
    case FETCH_QUESTION_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default questionReducer;
