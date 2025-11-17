import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import FitBounds from "../../../utils/FitBounds.jsx";
import classes from "../Map.module.css";

function MapTrackView({track}) {
    if (!track) return null;

    const positions = track?.steps
        .filter(step => step.place)
        .sort((firstStep, secondStep) => firstStep.step_order - secondStep.step_order)
        .map((step) => [Number(step.place.latitude), Number(step.place.longitude)])
        .filter(pos => pos[0] != null && pos[1] != null);

    if (positions.length === 0) return null;

    return (
        <MapContainer center={[48.08, 7.36]} zoom={12} scrollWheelZoom={false} className={classes['map-container']}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {track.steps.map((step) =>
                step.place && (
                    <Marker position={[Number(step.place.latitude), Number(step.place.longitude)]} key={step.id}>
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
