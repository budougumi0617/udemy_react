import React from 'react';
import PropTypes from 'prop-types';

// 引数をpropsではなく、受け取りたいpropsの変数名で受ければ、
// props.addressと言った呼び出しをする必要がなくなる
const GeocodeResult = ({ address, location }) => (
  <ul className="geocode-result">
    <li>住所:{address}</li>
    <li>緯度:{location.lat}</li>
    <li>経度:{location.lng}</li>
  </ul>
);

GeocodeResult.propTypes = {
  address: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

// requiredじゃないときはデフォルト引数の設定が必要。
GeocodeResult.defaultProps = {
  address: '',
};

export default GeocodeResult;
