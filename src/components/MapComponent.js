// MapComponent.js

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const MapComponent = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
