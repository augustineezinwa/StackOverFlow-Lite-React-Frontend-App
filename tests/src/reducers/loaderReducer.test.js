import loaderReducer from '../../../src/reducers/loaderReducer';

test('loader Reducer should be able to act on store as so', () => {
  const initialState = {
    isLoading: false,
    message: ''
  };


  const incomingAction = {
    type: 'LOADING_TRUE',
    payload: {
      isLoading: true,
      message: 'hello'
    }
  };

  const expectedState = {
    isLoading: true,
    message: 'hello'
  };


  expect(loaderReducer(initialState, incomingAction)).toEqual(expectedState);
});

test('notifications Reducer should be able to act on store as so', () => {
  const initialState = {
    isLoading: true,
    message: 'hello'
  };


  const incomingAction = {
    type: 'LOADING_FALSE',
    payload: {
      isLoading: false,
      message: ''
    }
  };

  const expectedState = {
    isLoading: false,
    message: ''
  };


  expect(loaderReducer(initialState, incomingAction)).toEqual(expectedState);
});
