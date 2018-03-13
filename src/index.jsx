import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

// import App from './components/App';
import SearchPage from './components/SearchPage';
import reducer from './reducers';

const store = createStore(reducer);

const render = () => {
  const state = store.getState();
  console.log(state);
  ReactDom.render(
    <SearchPage
      history={history}
      location={location}
      place={state.place}
      onPlaceChange={place => store.dispatch({ type: 'CHANGE_PLACE', place })}
    />,
    document.querySelector('.container'),
  );
};

render();
// store内容が更新されたときにrenderが呼ばれる。
store.subscribe(render);
