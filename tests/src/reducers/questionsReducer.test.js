import questionsReducer from '../../../src/reducers/questionsReducer';

test('question Reducer should be able to act on store as so', () => {
  const initialState = {
    data: [],
    errors: {}
  };


  const incomingAction = {
    type: 'FETCH_QUESTIONS_SUCCESS',
    payload: {
      data: [{ a: 1 }, { b: 2 }]
    }
  };

  const expectedState = {
    data: [{ a: 1 }, { b: 2 }],
    errors: {}
  };


  expect(questionsReducer(initialState, incomingAction)).toEqual(expectedState);
});

test('question Reducer should be able to act on store as so', () => {
  const initialState = {
    data: [],
    errors: {}
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
    errors: { a: 'error' }
  };


  expect(questionsReducer(initialState, incomingAction)).toEqual(expectedState);
});
