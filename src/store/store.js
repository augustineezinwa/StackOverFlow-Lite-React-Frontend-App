import configureStore from './configureStore';
import loadState from '../utils/loadState';
import saveState from '../utils/saveState';
import { setStore } from '../utils/apiClient';

const loadedState = loadState();

const store = configureStore(loadedState);

setStore(store);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  });
});

export default store;
