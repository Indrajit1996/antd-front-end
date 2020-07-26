import { createStore } from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import crudApp from './reducers';

export default () => {
  
  const persistedState = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : {};

  const store = createStore(
    crudApp,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  // save state to localStorage
  store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
  });

  return store;
};

