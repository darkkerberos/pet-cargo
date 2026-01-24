import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// Fix icon default leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  value: string; // Format: "-6.123, 106.123"
  onChange: (newValue: string) => void;
}

// Komponen internal untuk handle klik peta
const ClickHandler = ({ onChange }: { onChange: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapPicker = ({ value, onChange }: MapPickerProps) => {
  // Parsing koordinat dari string
  const getCoords = (val: string): [number, number] => {
    const parts = val.split(',').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return [parts[0], parts[1]];
    }
    return [-6.1595, 106.6420]; // Default ke Tangerang jika data corrupt
  };

  const position = getCoords(value);

  return (
    <div className="h-[250px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker 
          position={position} 
          icon={DefaultIcon}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const { lat, lng } = marker.getLatLng();
              onChange(`${lat}, ${lng}`);
            },
          }}
        />
        <ClickHandler onChange={(lat, lng) => onChange(`${lat}, ${lng}`)} />
      </MapContainer>
    </div>
  );
};

export default MapPicker;