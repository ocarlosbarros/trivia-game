import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from '../Reduces';

const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(thunk),
));

if (window.Cypress) {
  window.store = store;
}

export default store;
