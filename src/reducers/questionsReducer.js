import { FETCH_QUESTIONS_FAILURE, FETCH_QUESTIONS_SUCCESS } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { questions } = initialState;

const questionsReducer = (state = questions, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_QUESTIONS_FAILURE:
      return { ...state, ...payload };
    case FETCH_QUESTIONS_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default questionsReducer;
