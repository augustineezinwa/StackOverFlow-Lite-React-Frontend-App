import sendNotifications from '../../../src/actions/notificationsActions';

test('sendNotification should send message with status action to store', () => {
  expect(sendNotifications(true, 'hello')).toEqual({
    type: 'NOTIFY_USER_TRUE',
    payload: {
      message: 'hello',
      status: true
    }
  });

  expect(sendNotifications(false, '')).toEqual({
    type: 'NOTIFY_USER_FALSE',
    payload: {
      message: '',
      status: false
    }
  });
});
