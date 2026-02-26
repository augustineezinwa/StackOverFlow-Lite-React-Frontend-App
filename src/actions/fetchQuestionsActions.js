import { FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_FAILURE, QUESTIONS_LOADING_MORE } from './actionTypes';
import appLoader from './loaderActions';

const DEFAULT_LIMIT = 10;

export const fetchQuestionSuccess = (data, append = false, nextCursor = null, hasMore = true) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: { data, append, nextCursor, hasMore }
});

export const fetchQuestonFailure = errors => ({
  type: FETCH_QUESTIONS_FAILURE, payload: { errors }
});

export const fetchQuestions = ({ limit = DEFAULT_LIMIT, cursor, append = false } = {}) => (dispatch) => {
  if (append) {
    dispatch({ type: QUESTIONS_LOADING_MORE, payload: true });
  } else {
    dispatch(appLoader(true, 'Loading StackOverFlow-Lite'));
  }
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  if (cursor != null && cursor !== '') {
    params.set('cursor', String(cursor));
  }
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const url = `${process.env.APP_BASE_URL}/questions${queryString}`;
  return fetch(url)
    .then(res => res.json(), err => {
      if (append) dispatch({ type: QUESTIONS_LOADING_MORE, payload: false });
      else dispatch(appLoader(false, err.message));
      return Promise.reject(err);
    })
    .then((data) => {
      if (data.status === 'success') {
        const questionData = data.data && Array.isArray(data.data.questions) ? data.data.questions : [];
        const nextCursorFromApi = data.data && (data.data.nextCursor != null ? data.data.nextCursor : data.data.cursor);
        const lastId = questionData.length > 0 && questionData[questionData.length - 1].id != null
          ? questionData[questionData.length - 1].id
          : null;
        const nextCursor = nextCursorFromApi != null ? nextCursorFromApi : lastId;
        const hasMore = data.data && (data.data.hasMore != null ? data.data.hasMore : questionData.length >= limit);
        if (!append) dispatch(appLoader(false, ''));
        dispatch(fetchQuestionSuccess(questionData, append, nextCursor, hasMore));
        return questionData;
      }
      if (append) dispatch({ type: QUESTIONS_LOADING_MORE, payload: false });
      else dispatch(appLoader(false, ''));
      return [];
    })
    .catch(() => {
      if (append) dispatch({ type: QUESTIONS_LOADING_MORE, payload: false });
      return [];
    });
};
