// src/components/Map.js
"use client"; // クライアントコンポーネントとして指定

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ spots }) => {
  return (
    <MapContainer
      center={[35.0, 135.0]}
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {spots.map((spot, index) => (
        <Marker key={index} position={[spot.lat, spot.lon]}>
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
