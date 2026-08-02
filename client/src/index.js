// Copyright: Panshak Solomon
// A.P. Leventis Ornithological Research Institute.
// University of Jos Biological Conservatory
// All right reserved
// ©2021 and beyond


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {  createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/'
import throttle from 'lodash/throttle';



const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const persistedState = loadState();

const store = createStore(reducers, persistedState, compose(applyMiddleware(thunk)))

// store.subscribe(() => {
//   saveState(store.getState());
// });

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

// const store = createStore(
//   persistedState,
//   // Others reducers...
// );


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);
