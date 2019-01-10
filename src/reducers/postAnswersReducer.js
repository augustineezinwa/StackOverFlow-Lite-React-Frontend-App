import { POST_ANSWER_FAILURE, POST_ANSWER_SUCCESS } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { answers } = initialState;

const postAnswersReducer = (state = answers, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_ANSWER_FAILURE:
      return { ...state, ...payload };
    case POST_ANSWER_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default postAnswersReducer;
