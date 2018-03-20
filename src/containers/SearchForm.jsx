import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { geocode } from '../domain/Geocoder.js';
// import { searchHotelByLocation } from '../domain/HotelRepository';
import { setPlace, startSearch } from '../actions/index.js';

// Presentation Component。描画しているだけで純粋関数に近い。
const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.startSearch(props.place);
    }}
  >
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        // actions/index.jsで定義されているplaceを処理する関数が戻ってくるので、それがactionにセットされる
        // thunkのmiddlewareに渡されたとき、actionがfunctionになる
        props.setPlace(e.target.value);
      }}
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  setPlace: PropTypes.func.isRequired,
  startSearch: PropTypes.func.isRequired,
};

// mapStateToProps Storeが更新される度に呼ばれる。つまり、アプリの状態が変化したときのコールバック
// { setPlace } ReduxComponentのイベントとReduxのActionを結びつける。middlewareを使っているのでこう書ける。
export default connect(
  // mapStateToProps
  state => ({
    place: state.place,
  }),
  // mapDispatchToProps
  { setPlace, startSearch },
)(SearchForm);
