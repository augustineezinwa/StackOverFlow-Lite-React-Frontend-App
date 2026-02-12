import { FETCH_QUESTIONS_FAILURE, FETCH_QUESTIONS_SUCCESS } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { questions } = initialState;

const questionsReducer = (state = questions, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_QUESTIONS_FAILURE:
      return { ...state, ...payload };
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
        return { ...state, data: mergedQuestions };
      }
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default questionsReducer;
