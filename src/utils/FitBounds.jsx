import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * @param {Array} positions - [lat, lng]
 */
function FitBounds({ positions }) {
    const map = useMap();

    useEffect(() => {
        if (!positions || positions.length === 0) return;

        const bounds = L.latLngBounds(positions);
        map.fitBounds(bounds, { padding: [50, 50] });
    }, [positions, map]);

    return null;
}

export default FitBounds;
