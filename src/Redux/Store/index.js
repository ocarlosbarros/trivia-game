import { createStore } from 'redux';
import rootReducers from '../Reduces';

const store = createStore(rootReducers);

if (window.Cypress) {
  window.store = store;
}

export default store;
