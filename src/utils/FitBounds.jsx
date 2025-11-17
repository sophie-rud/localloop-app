import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * @param {Array} positions - [latitude, longitude]
 */
function FitBounds({ positions }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !positions || positions.length === 0) return;

        if (positions.length === 1) {
            map.setView(positions[0], 13);
        } else {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, positions]);

    return null;
}

export default FitBounds;
