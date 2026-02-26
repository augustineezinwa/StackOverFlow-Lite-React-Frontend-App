import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import questionReducer from './questionReducer';
import loaderReducer from './loaderReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import notificationsReducer from './notifcationsReducer';
import answersReducer from './postAnswersReducer';
import profileReducer from './profileReducer';
import userQuestionsReducer from './userQuestionsReducer';

const indexReducer = combineReducers({
  questions: questionsReducer,
  question: questionReducer,
  loaders: loaderReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  auth: authReducer,
  answers: answersReducer,
  profile: profileReducer,
  userQuestions: userQuestionsReducer
});

export default indexReducer;
