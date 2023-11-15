import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importa la biblioteca Leaflet
import 'leaflet/dist/leaflet.css';
import "../assets/css/mapa.css";

// Convierte el SVG en un ícono personalizado
const customIcon = new L.divIcon({
  className: 'custom-icon-class', // Clase CSS personalizada
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>`,
  iconSize: [16, 16], // Tamaño del ícono
});

export const Mapa = (props) => {
  const position = [props.latitude, props.longitude];

  return (
    <MapContainer center={position} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.marcador?(<Marker position={position} icon={customIcon}>
        <Popup>
          Marcador de ubicación
        </Popup>
      </Marker>):null}
      
    </MapContainer>
  );
};
