import {
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_SUCCESS,
  QUESTIONS_LOADING_MORE,
  QUESTION_ARCHIVED
} from '../actions/actionTypes';
import initialState from '../store/initialState';

const { questions } = initialState;

const questionsReducer = (state = questions, action) => {
  const { type, payload } = action;
  switch (type) {
    case QUESTIONS_LOADING_MORE:
      return { ...state, loadingMore: payload === true };
    case FETCH_QUESTIONS_FAILURE:
      return { ...state, ...payload, loadingMore: false };
    case FETCH_QUESTIONS_SUCCESS:
      if (payload && payload.append) {
        const existingQuestions = Array.isArray(state.data) ? state.data : [];
        const incomingQuestions = Array.isArray(payload.data) ? payload.data : [];
        const mergedQuestions = [...existingQuestions];
        incomingQuestions.forEach((question) => {
          if (!mergedQuestions.some(existingQuestion => existingQuestion.id === question.id)) {
            mergedQuestions.push(question);
          }
        });
        return {
          ...state,
          data: mergedQuestions,
          nextCursor: payload.nextCursor != null ? payload.nextCursor : state.nextCursor,
          hasMore: payload.hasMore != null ? payload.hasMore : state.hasMore,
          loadingMore: false
        };
      }
      return {
        ...state,
        data: payload.data || state.data,
        nextCursor: payload.nextCursor != null ? payload.nextCursor : null,
        hasMore: payload.hasMore != null ? payload.hasMore : true,
        loadingMore: false
      };
    case QUESTION_ARCHIVED: {
      const id = payload;
      const data = Array.isArray(state.data)
        ? state.data.filter((q) => q.id != null && String(q.id) !== String(id))
        : state.data;
      return { ...state, data };
    }
    default:
      return state;
  }
};

export default questionsReducer;
