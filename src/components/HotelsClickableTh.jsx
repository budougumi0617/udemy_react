import React from 'react';
import PropTypes from 'prop-types';

const HotelsClickableTh = ({
  label, onSort, isSelected, sortKey,
}) => (
  <th
    className="hotel-clickable-th"
    onClick={() => onSort(sortKey)}
  >
    {label}{isSelected ? '▲' : ''}
  </th>
);

HotelsClickableTh.propTypes = {
  label: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default HotelsClickableTh;
