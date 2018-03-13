import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder.js';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      place: this.getPlaceParam() || '東京タワー',
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      sortKey: 'price',
      // ハッシュ配列のダミーデータ
      // hotels: [
      //   { id: 111, name: 'ホテルオークラ', url: 'https://google.com' },
      //   { id: 22, name: 'アパホテル', url: 'https://yahoo.co.jp' },
      // ],
    };
  }

  // ComponentがDOMツリーに追加される前に一度だけ呼ばれる
  componentDidMount() {
    const place = this.getPlaceParam();
    if (place) {
      this.startSearch(place);
    }
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  handlePlaceChange(e) {
    e.preventDefault();
    this.props.onPlaceChange(e.target.value);
  }

  handlePlaceSubmit(e) {
    // https://developer.mozilla.org/ja/docs/Web/API/Event/preventDefault
    // 画面遷移などのイベントを抑制する
    e.preventDefault();
    // pushを使えばページ遷移時にパラメータをURLに付加することができる。
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch(this.state.place);
  }

  startSearch() {
    geocode(this.state.place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          default: {
            this.setErrorMessage('エラーが発生しました');
          }
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
      })
      .catch(() => {
        this.setErrorMessage('通信にエラーが発生しました');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm
          place={this.props.place}
          onPlaceChange={e => this.handlePlaceChange(e)}
          onSubmit={e => this.handlePlaceSubmit(e)}
        />
        {/*
        <div className="result-area">
          <Map location={this.state.location} />
          <div>
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
        */}
      </div>
    );
  }
}

SearchPage.propTypes = {
  // react-router-domを使っているとpropsにhistoryやmatchなどの情報が追加される
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
};

export default SearchPage;
