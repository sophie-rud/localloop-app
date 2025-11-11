import {Marker, Popup} from 'react-leaflet';
import classes from './MapSearch.module.css';
import TrackOverview from "../../TrackOverview/TrackOverview.jsx";
import L from 'leaflet';
import blackMarker from '../../../assets/icons/marker-icon-2x-black.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import BaseMap from "../BaseMap/BaseMap.jsx";

function MapSearch() {

    const position = [48.08, 7.36]

    const blackIcon = new L.Icon({
        iconUrl: blackMarker,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <BaseMap>
                <Marker position={position} icon={blackIcon}>
                    <Popup>
                        <TrackOverview />
                    </Popup>
                </Marker>
        </BaseMap>
    )
}

export default MapSearch;
