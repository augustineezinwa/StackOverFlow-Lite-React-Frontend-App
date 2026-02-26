import {
  FETCH_PINNED_QUESTIONS_SUCCESS,
  FETCH_PINNED_QUESTIONS_FAILURE
} from '../actions/actionTypes';
import initialState from '../store/initialState';

const { pinnedQuestions } = initialState;

const pinnedQuestionsReducer = (state = pinnedQuestions, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PINNED_QUESTIONS_SUCCESS:
      return { ...state, data: payload.data || [], error: null };
    case FETCH_PINNED_QUESTIONS_FAILURE:
      return { ...state, data: [], error: payload || null };
    default:
      return state;
  }
};

export default pinnedQuestionsReducer;
