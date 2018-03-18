import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { geocode } from '../domain/Geocoder.js';
// import { searchHotelByLocation } from '../domain/HotelRepository';

// Presentation Component。描画しているだけで純粋関数に近い。
const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit(props.place);
    }}
  >
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.onPlaceChange(e.target.value);
      }}
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  place: state.place,
});

const mapDispatchToProps = dispatch => ({
  onPlaceChange: place => dispatch({ type: 'CHANGE_PLACE', place }),
  // dispatchはgeocodeの検索結果が戻ってきたときなので、まず普通の関数処理を書く
  onSubmit: (place) => {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            //      return searchHotelByLocation(location);
            break;
          }
          case 'ZERO_RESULTS': {
            //       this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          default: {
            // this.setErrorMessage('エラーが発生しました');
          }
        }
        return [];
      });
    //   .then((hotels) => {
    //     this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
    //   })
    //   .catch(() => {
    //     this.setErrorMessage('通信にエラーが発生しました');
    //   });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
