import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import FitBounds from "../../../utils/FitBounds.jsx";
import classes from "../Map.module.css";
import L from "leaflet";
import blackMarker from "../../../assets/icons/marker-icon-2x-black.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function MapTrackView({steps}) {
    const blackIcon = new L.Icon({
        iconUrl: blackMarker,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const positions = steps
        .map((step) => [step.place.latitude, step.place.longitude])
        .filter(pos => pos[0] != null && pos[1] != null);

    if (positions.length === 0) return null;

    return (
        <MapContainer center={[48.08, 7.36]} zoom={12} scrollWheelZoom={false} className={classes['map-container']}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {steps.map((step) =>
                step.place && (
                    <Marker position={[Number(step.place.latitude), Number(step.place.longitude)]} icon={blackIcon} key={step.id}>
                        <Popup>{step.name}</Popup>
                    </Marker>
                )
            )}
            <Polyline pathOptions={{color: 'blue'}} weight={3} positions={positions} />
            <FitBounds positions={positions} />
        </MapContainer>
    );
}

export default MapTrackView;
