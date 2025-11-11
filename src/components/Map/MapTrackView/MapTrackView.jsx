import BaseMap from "../BaseMap/BaseMap.jsx";
import {Marker, Polyline, Popup} from "react-leaflet";
import FitBounds from "../../../utils/FitBounds.jsx";

function MapTrackView() {
    return (
        <BaseMap>
            <Polyline color="blue" />
                <Marker>
                    <Popup>Titre</Popup>
                </Marker>

            <FitBounds />
        </BaseMap>
    );
}

export default MapTrackView;
