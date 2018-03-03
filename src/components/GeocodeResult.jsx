import React, { PropTypes } from 'react';

// 引数をpropsではなく、受け取りたいpropsの変数名で受ければ、
// props.addressと言った呼び出しをする必要がなくなる
const GeocodeResult = ({ address, lat, lng }) => (
  <ul className="geocode-result">
    <li>住所:{address}</li>
    <li>緯度:{lat}</li>
    <li>経度:{lng}</li>
  </ul>
);

GeocodeResult.propTypes = {
  address: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

// requiredじゃないときはデフォルト引数の設定が必要。
GeocodeResult.defaultProps = {
  address: '',
};

export default GeocodeResult;
