import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import indexReducer from '../reducers/indexReducer';

const composeEnhancers = composeWithDevTools({});


const configureStore = (settings = {}) => createStore(
  indexReducer, settings,
  composeEnhancers(applyMiddleware(thunk))
);

export default configureStore;
