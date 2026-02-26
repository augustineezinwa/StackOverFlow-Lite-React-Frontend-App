import { FETCH_USER_QUESTIONS_SUCCESS, FETCH_USER_QUESTIONS_FAILURE, USER_QUESTIONS_LOADING_MORE } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { userQuestions } = initialState;

const userQuestionsReducer = (state = userQuestions, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_QUESTIONS_LOADING_MORE:
      return { ...state, loadingMore: payload === true };
    case FETCH_USER_QUESTIONS_SUCCESS:
      if (payload && payload.append) {
        const existing = Array.isArray(state.data) ? state.data : [];
        const incoming = Array.isArray(payload.data) ? payload.data : [];
        const merged = [...existing];
        incoming.forEach((q) => {
          if (!merged.some((eq) => eq.id === q.id)) merged.push(q);
        });
        return {
          ...state,
          data: merged,
          nextCursor: payload.nextCursor != null ? payload.nextCursor : state.nextCursor,
          hasMore: payload.hasMore != null ? payload.hasMore : state.hasMore,
          loadingMore: false,
          errors: {}
        };
      }
      return {
        ...state,
        data: payload.data || [],
        nextCursor: payload.nextCursor != null ? payload.nextCursor : null,
        hasMore: payload.hasMore != null ? payload.hasMore : true,
        loadingMore: false,
        errors: {}
      };
    case FETCH_USER_QUESTIONS_FAILURE:
      return { ...state, errors: payload || {}, loadingMore: false };
    default:
      return state;
  }
};

export default userQuestionsReducer;
