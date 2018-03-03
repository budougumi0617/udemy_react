import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const InnerMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.position}
    center={props.position}
  >
    <Marker {...props.marker} />
  </GoogleMap>
));

const Map = ({ lat, lng }) => {
  const position = { lat, lng };
  return (
    <InnerMap
      containerElement={(<div />)}
      mapElement={(<div className="map" />)}
      position={position}
      marker={{ position }}
    />
  );
};

// propsのvalidationを定義しておく
Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

// propsのデフォルト値を定義しておく
Map.defaultProps = {
};

export default Map;
