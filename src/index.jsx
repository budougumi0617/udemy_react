import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducer from './reducers';

// Middlewareを追加している。viewから発行されたactionをごにょごにょしてreducerにわたす。
// loggingとかできる。
const store = createStore(
  reducer, /* preloadedState, */
  // http://extension.remotedev.io/
  composeWithDevTools(applyMiddleware(thunk)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.container'),
);


// thunkのコード
/*
function createThunkMiddleware(extraArgument) {
  // nextは次のmiddleware
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
// thunk(store)(next)(action)と呼んでいるイメージ
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
*/
