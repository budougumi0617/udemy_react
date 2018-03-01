import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const InnerMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
  </GoogleMap>
));

const Map = props => (
  <InnerMap
    containerElement={(<div />)}
    mapElement={(<div className="map"/>)}
  />
);

export default Map;
