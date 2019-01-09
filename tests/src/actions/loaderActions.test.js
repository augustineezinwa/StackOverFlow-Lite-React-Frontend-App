import appLoader from '../../../src/actions/loaderActions';

test('appLoader should send message with status action to store', () => {
  expect(appLoader(true, 'hello')).toEqual({
    type: 'LOADING_TRUE',
    payload: {
      message: 'hello',
      isLoading: true
    }
  });

  expect(appLoader(false, '')).toEqual({
    type: 'LOADING_FALSE',
    payload: {
      message: '',
      isLoading: false
    }
  });
});
