import usersReducer from '../../../src/reducers/usersReducer';

test('usersReducer should be able to act on store as so', () => {
  const initialState = {
    data: [],
    errors: {}
  };


  const incomingAction = {
    type: 'FETCH_USERS_SUCCESS',
    payload: {
      data: [{ a: 1 }, { b: 2 }]
    }
  };

  const expectedState = {
    data: [{ a: 1 }, { b: 2 }],
    errors: {}
  };


  expect(usersReducer(initialState, incomingAction)).toEqual(expectedState);
});

test('question Reducer should be able to act on store as so', () => {
  const initialState = {
    data: [],
    errors: {}
  };


  const incomingAction = {
    type: 'FETCH_USERS_FAILURE',
    payload: {
      data: [],
      errors: { a: 'error' }
    }
  };

  const expectedState = {
    data: [],
    errors: { a: 'error' }
  };


  expect(usersReducer(initialState, incomingAction)).toEqual(expectedState);
});
