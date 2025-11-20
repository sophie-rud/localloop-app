import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import TrackOverview from "../../TrackOverview/TrackOverview.jsx";
import L from 'leaflet';
import blackMarker from '../../../assets/icons/marker-icon-2x-black.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import mapClasses from "../Map.module.css";
import classes from "./MapSearch.module.css"
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import enrichTracks from "../../../utils/enrichTracks.jsx";

function MapSearch() {
    const { tracks, loadTracks, setSelectedTrack, selectedTrack, loading: tracksLoading } = useTracksStore();
    const { steps, places, loading: stepsLoading } = useStepsAndPlaces();
    const { themes, departments, loading: refLoading } = useReferenceData();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    const loading = tracksLoading || stepsLoading || refLoading;
    if (loading) return <p>Chargement…</p>;

    if (!tracks.length || !steps.length || !places.length || !themes.length || !departments.length) {
        return <p>Pas de données disponibles</p>;
    }

    const enrichedTracks = enrichTracks(tracks, { steps, places, departments, themes });


    const blackIcon = new L.Icon({
        iconUrl: blackMarker,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    return (
        <MapContainer center={[48.30, 7.60]} zoom={8.3} scrollWheelZoom style={{ height: "50vh" }} className={mapClasses['map-container']}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {enrichedTracks.map((track) => {
                if (!track.positions) return null;

                return (
                    <Marker position={[track.positions.lat, track.positions.lng]}
                            key={track.id}
                            icon={blackIcon}
                            eventHandlers={{
                                click: () => setSelectedTrack(track),
                            }}
                    >
                        <Popup className={classes['custom-popup']}>
                            <Link to={`/tracks/${track.id}`} className={classes['view-track-link']} >
                                <TrackOverview track={selectedTrack} key={track.id}/>
                            </Link>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}

export default MapSearch;
