import {MapContainer, TileLayer} from 'react-leaflet';
import classes from './BaseMap.module.css';


function BaseMap({ center = [48.08, 7.36], zoom = 12, children }) {

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom className={classes['map-container']}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
}

export default BaseMap;
