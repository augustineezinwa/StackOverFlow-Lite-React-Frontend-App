import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import { fetchUserFailure, fetchUserSuccess, fetchUsers } from '../../../src/actions/fetchUsersActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('fetch user async action should trigger the following set of actions', () => {
  const recievedData = {
    status: 'success',
    data: {
      users: [
        {
          id: 1,
          fullName: 'hyfghdhhhhhhhhhhhhhhhhh jjjdjdj',
          jobRole: 'Update your job role',
          company: 'Update your company name',
          photo: 'image-url',
          numberOfAnswers: 0,
          earnedUpvotes: 0,
          earnedDownvotes: 0,
          numberOfQuestions: 1,
          time: '10:20:49 GMT+0000 (UTC)',
          date: 'Thu Nov 15 2018'
        },
        {
          id: 3,
          fullName: 'abiodun abudu',
          jobRole: 'Update your job role',
          company: 'Update your company name',
          photo: 'https://x.y.z',
          numberOfAnswers: 0,
          earnedUpvotes: 0,
          earnedDownvotes: 0,
          numberOfQuestions: 0,
          time: '17:11:43 GMT+0000 (UTC)',
          date: 'Mon Nov 26 2018'
        }
      ]
    }
  };
  fetchMock.get(`${process.env.APP_BASE_URL}/users`, recievedData);

  const store = mockStore({});

  const expectedActions = [{
    payload: {
      isLoading: true,
      message: 'Loading data...'
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
      data: recievedData.data.users
    },
    type: 'FETCH_USERS_SUCCESS'
  }
  ];
  return store.dispatch(fetchUsers())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
});

test('fetch question success actions should trigger the expected action', () => {
  const data = [
    {
      id: 4,
      questionTitle: 'any questions today',
      questionDescription: 'I need questions , so guys feel free to do so, aight',
      answers: [],
      numberOfAnswers: 0,
      upvotes: 0,
      downvotes: 0,
      time: '23:00:16 GMT+0000 (UTC)',
      date: 'Sat Jan 05 2019',
      userId: 5
    }
  ];
  expect(fetchUserSuccess(data)).toEqual({
    type: 'FETCH_USERS_SUCCESS',
    payload: { data }
  });
});


test('fetch question failure actions should trigger the expected action', () => {
  const err = { err: 'I have err' };
  expect(fetchUserFailure(err)).toEqual({
    type: 'FETCH_USERS_FAILURE',
    payload: { errors: err }
  });
});
