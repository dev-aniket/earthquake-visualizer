// FRONTEND/src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapView = ({ data = [], onSelect }) => {
  // data is an array of GeoJSON features
  return (
    <div className="w-full h-[60vh] md:h-[70vh] max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg">
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {data.map((f) => {
          const [lon, lat, depth] = f.geometry.coordinates;
          const { mag, place, time } = f.properties;
          return (
            <Marker
              key={f.id || `${lat}-${lon}-${mag}`}
              position={[lat, lon]}
              icon={markerIcon}
              eventHandlers={{
                click: () => onSelect && onSelect(f),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{place}</div>
                  <div>Mag: {mag}</div>
                  <div>Depth: {depth ?? "n/a"} km</div>
                  <div className="text-xs text-gray-500">{new Date(time).toLocaleString()}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
