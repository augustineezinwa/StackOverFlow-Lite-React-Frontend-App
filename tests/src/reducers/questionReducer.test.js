import questionReducer from '../../../src/reducers/questionReducer';

test('question Reducer should be able to act on store as so', () => {
  const initialState = {
    data: [],
    errors: {}
  };


  const incomingAction = {
    type: 'FETCH_QUESTION_SUCCESS',
    payload: {
      data: [{ a: 1 }, { b: 2 }]
    }
  };

  const expectedState = {
    data: [{ a: 1 }, { b: 2 }],
    errors: {}
  };


  expect(questionReducer(initialState, incomingAction)).toEqual(expectedState);
});

test('question Reducer should be able to act on store as so', () => {
  const initialState = {
    data: [],
    errors: {}
  };


  const incomingAction = {
    type: 'FETCH_QUESTION_FAILURE',
    payload: {
      data: [],
      errors: { a: 'error' }
    }
  };

  const expectedState = {
    data: [],
    errors: { a: 'error' }
  };


  expect(questionReducer(initialState, incomingAction)).toEqual(expectedState);
});
