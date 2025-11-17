import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import TrackOverview from "../../TrackOverview/TrackOverview.jsx";
import L from 'leaflet';
import blackMarker from '../../../assets/icons/marker-icon-2x-black.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useFetchTracks from "../../../hooks/use-fetch-tracks.jsx";
import {useEffect} from "react";
import classes from "../Map.module.css";

function MapSearch() {

    const {tracks} = useTracksStore();
    const {request} = useFetchTracks();

    useEffect(() => {
        request()
    }, [])

    const blackIcon = new L.Icon({
        iconUrl: blackMarker,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <MapContainer center={[48.08, 7.36]} zoom={12} scrollWheelZoom style={{ height: "50vh" }} className={classes['map-container']}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {tracks.map((track) => {
                const startingPoint = track.steps?.[0];
                const place = startingPoint?.place;
                if(!place) return null;

                return (
                    <Marker position={[Number(place.latitude), Number(place.longitude)]} key={track.id} icon={blackIcon}>
                        <Popup>
                            <TrackOverview track={track} />
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}

export default MapSearch;
