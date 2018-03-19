import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';

import SearchForm from '../containers/SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
// import HotelsTable from './HotelsTable';


const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

// Container component。もろもろの処理をしている。
// フォルダーもcomponentから分けるのが望ましい。
class SearchPage extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
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
    // const place = this.getPlaceParam();
    // if (place) {
    //   this.startSearch(place);
    // }
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

  // handlePlaceSubmit(e) {
  //   // https://developer.mozilla.org/ja/docs/Web/API/Event/preventDefault
  //   // 画面遷移などのイベントを抑制する
  //   e.preventDefault();
  //   // pushを使えばページ遷移時にパラメータをURLに付加することができる。
  //   this.props.history.push(`/?place=${this.state.place}`);
  //   this.startSearch(this.state.place);
  // }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm />
        <div className="result-area">
          <Map location={this.props.geocodeResult.location} />
          <div>
            <GeocodeResult
              address={this.props.geocodeResult.address}
              location={this.props.geocodeResult.location}
            />
            {/*
            <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
            */}
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  // react-router-domを使っているとpropsにhistoryやmatchなどの情報が追加される
  // history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  geocodeResult: state.geocodeResult,
});

export default connect(mapStateToProps)(SearchPage);
