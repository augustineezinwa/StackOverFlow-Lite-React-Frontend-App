import questionsReducer from '../../../src/reducers/questionsReducer';

test('question Reducer should be able to act on store as so', () => {
  const initialState = {
    data: [],
    errors: {},
    nextCursor: null,
    hasMore: true,
    loadingMore: false
  };

  const incomingAction = {
    type: 'FETCH_QUESTIONS_SUCCESS',
    payload: {
      data: [{ a: 1 }, { b: 2 }]
    }
  };

  const expectedState = {
    data: [{ a: 1 }, { b: 2 }],
    errors: {},
    nextCursor: null,
    hasMore: true,
    loadingMore: false
  };

  expect(questionsReducer(initialState, incomingAction)).toEqual(expectedState);
});

test('question Reducer should handle FETCH_QUESTIONS_FAILURE', () => {
  const initialState = {
    data: [],
    errors: {},
    nextCursor: null,
    hasMore: true,
    loadingMore: false
  };

  const incomingAction = {
    type: 'FETCH_QUESTIONS_FAILURE',
    payload: {
      data: [],
      errors: { a: 'error' }
    }
  };

  const expectedState = {
    data: [],
    errors: { a: 'error' },
    nextCursor: null,
    hasMore: true,
    loadingMore: false
  };

  expect(questionsReducer(initialState, incomingAction)).toEqual(expectedState);
});
