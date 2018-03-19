import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import App from './components/App';
import SearchPage from './components//SearchPage';
import reducer from './reducers';

const store = createStore(
  reducer, /* preloadedState, */
  // http://extension.remotedev.io/
  composeWithDevTools(applyMiddleware(thunk)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDom.render(
  <Provider store={store}>
    <SearchPage
      history={history}
      location={location}
    />
  </Provider>,
  document.querySelector('.container'),
);
