
import { POST_QUESTION_FAILURE, POST_QUESTION_SUCCESS } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { postQuestion } = initialState;

const questionReducer = (state = postQuestion, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_QUESTION_FAILURE:
      return { ...state, ...payload };
    case POST_QUESTION_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default questionReducer;
