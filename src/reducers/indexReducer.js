import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import questionReducer from './questionReducer';
import loaderReducer from './loaderReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import notificationsReducer from './notifcationsReducer';

const indexReducer = combineReducers({
  questions: questionsReducer,
  question: questionReducer,
  loaders: loaderReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  auth: authReducer
});

export default indexReducer;
