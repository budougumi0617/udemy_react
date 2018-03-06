import React from 'react';
import PropTypes from 'prop-types';

const HotelRow = ({ hotel }) => (
  <tr>
    <td><a href={hotel.url} target="_blank">{hotel.name}</a></td>
  </tr>
);

HotelRow.propTypes = {
  // ハッシュ構造体の引数を定義するときはshapeが使える。
  hotel: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default HotelRow;
