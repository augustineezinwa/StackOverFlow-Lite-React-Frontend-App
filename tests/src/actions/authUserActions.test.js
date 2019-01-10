import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import {
 authUser, loginUser, authUserFailure, authUserSuccess 
} from '../../../src/actions/authUserActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('auth user async action should trigger the following set of actions', () => {
  const recievedData = {
    status: 'success',
    isLoggedIn: true
  };

  fetchMock.post(`${process.env.APP_BASE_URL}/auth/signup`, recievedData);

  const store = mockStore({});

  const expectedActions = [{
    payload: {
      isLoading: true,
      message: 'Wait.. while we sign you up'
    },
    type: 'LOADING_TRUE'
  },
  {
    payload: {
      isLoading: false,
      message: ''
    },
    type: 'LOADING_FALSE'
  },
  {
    payload: {
      isLoggedIn: true,
    },
    type: 'AUTH_USER_SUCCESS'
  },
  {
    payload: {
      message: '',
      status: true
    },
    type: 'NOTIFY_USER_TRUE'
  }
  ];
  return store.dispatch(authUser('augustine', 'ezinwa', 'augustineezinwa@gmail.com', 'dfdf', 'dfdf', { push: jest.fn() }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});


test('login user async action should trigger the following set of actions', () => {
  const recievedData = {
    status: 'success',
    isLoggedIn: true
  };

  fetchMock.post(`${process.env.APP_BASE_URL}/auth/login`, recievedData);

  const store = mockStore({});

  const expectedActions = [{
    payload: {
      isLoading: true,
      message: 'System is logging you in'
    },
    type: 'LOADING_TRUE'
  },
  {
    payload: {
      isLoading: false,
      message: ''
    },
    type: 'LOADING_FALSE'
  },
  {
    payload: {
      isLoggedIn: true,
    },
    type: 'AUTH_USER_SUCCESS'
  },
  {
    payload: {
      message: '',
      status: true
    },
    type: 'NOTIFY_USER_TRUE'
  }
  ];
  return store.dispatch(loginUser('augustineezinwa@gmail.com', 'ytyrtrg45r', { push: jest.fn() }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('fetch user async action should trigger the following set of actions', () => {
  const recievedData = {
    status: 'fail',
    isLoggedIn: true
  };

  fetchMock.post(`${process.env.APP_BASE_URL}/auth/signup`, recievedData);

  const store = mockStore({});

  const expectedActions = [{
    payload: {
      isLoading: true,
      message: 'Wait.. while we sign you up'
    },
    type: 'LOADING_TRUE'
  },
  {
    payload: {
      isLoading: false,
      message: '',
    },
    type: 'LOADING_FALSE'
  },
  {
    payload: {
      message: '',
      status: true
    },
    type: 'NOTIFY_USER_TRUE'
  },
  ];
});


test('login user async action should trigger the following set of actions', () => {
  const recievedData = {
    status: 'fail',
    isLoggedIn: true
  };

  fetchMock.post(`${process.env.APP_BASE_URL}/auth/login`, recievedData);

  const store = mockStore({});

  const expectedActions = [{
    payload: {
      isLoading: true,
      message: 'System is logging you in'
    },
    type: 'LOADING_TRUE'
  },
  {
    payload: {
      isLoading: false,
      message: '',
    },
    type: 'LOADING_FALSE'
  },
  {
    payload: {
      message: '',
      status: true
    },
    type: 'NOTIFY_USER_TRUE'
  },
  ];
  return store.dispatch(loginUser('augustineezinwa@gmail.com', 'dfdf', { push: jest.fn() }))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('auth success actions should trigger the expected action', () => {
  expect(authUserSuccess(true)).toEqual({
    type: 'AUTH_USER_SUCCESS',
    payload: { isLoggedIn: true }
  });
});


test('auth failure actions should trigger the expected action', () => {
  const err = { err: 'I have err' };
  expect(authUserFailure(err)).toEqual({
    type: 'AUTH_USER_FAILURE',
    payload: { errors: err }
  });
});
