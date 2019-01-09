import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import { fetchQuestionSuccess, fetchQuestonFailure, fetchQuestions } from '../../../src/actions/fetchQuestionsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

test('fetch question async action should trigger the following set of actions', () => {
  const recievedData = {
    status: 'success',
    data: {
      questions: [

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
        },
        {
          id: 1,
          questionTitle: 'fdsdafdsasf',
          questionDescription: 'fdsafsafasfdsa',
          answers: [],
          numberOfAnswers: 1,
          upvotes: 0,
          downvotes: 0,
          time: '10:21:01 GMT+0000 (UTC)',
          date: 'Thu Nov 15 2018',
          userId: 1
        }

      ]
    }
  };
  fetchMock.get(`${process.env.APP_BASE_URL}/questions`, recievedData);

  const store = mockStore({});

  const expectedActions = [{
    payload: {
      isLoading: true,
      message: 'Loading StackOverFlow-Lite'
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
      data: recievedData.data.questions
    },
    type: 'FETCH_QUESTIONS_SUCCESS'
  }
  ];
  return store.dispatch(fetchQuestions())
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
  expect(fetchQuestionSuccess(data)).toEqual({
    type: 'FETCH_QUESTIONS_SUCCESS',
    payload: { data }
  });
});


test('fetch question failure actions should trigger the expected action', () => {
  const err = { err: 'I have err' };
  expect(fetchQuestonFailure(err)).toEqual({
    type: 'FETCH_QUESTIONS_FAILURE',
    payload: { errors: err }
  });
});
