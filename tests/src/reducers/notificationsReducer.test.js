import notificationsReducer from '../../../src/reducers/notifcationsReducer';

test('notifications Reducer should be able to act on store as so', () => {
  const initialState = {
    status: 'false',
    message: ''
  };


  const incomingAction = {
    type: 'NOTIFY_USER_TRUE',
    payload: {
      status: true,
      message: 'hello'
    }
  };

  const expectedState = {
    status: true,
    message: 'hello'
  };


  expect(notificationsReducer(initialState, incomingAction)).toEqual(expectedState);
});

test('notifications Reducer should be able to act on store as so', () => {
  const initialState = {
    status: true,
    message: 'hello'
  };


  const incomingAction = {
    type: 'NOTIFY_USER_FALSE',
    payload: {
      status: false,
      message: ''
    }
  };

  const expectedState = {
    status: false,
    message: ''
  };


  expect(notificationsReducer(initialState, incomingAction)).toEqual(expectedState);
});
