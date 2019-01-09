import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import loaderReducer from './loaderReducer';
import notificationsReducer from './notifcationsReducer';

const indexReducer = combineReducers({
  questions: questionsReducer,
  loaders: loaderReducer,
  notifications: notificationsReducer
});

export default indexReducer;
