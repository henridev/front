import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleWares = [require('redux-immutable-state-invariant').default()];

const store = createStore(
  rootReducer,
  composeEnchancers(applyMiddleware(...middleWares))
);

export default store;
