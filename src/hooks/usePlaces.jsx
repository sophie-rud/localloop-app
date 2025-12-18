import { useState, useEffect } from "react";
import { getRequest } from "../services/request";

export default function usePlaces() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const placesData = await getRequest("/places");
                setPlaces(placesData);
            } catch (err) {
                setError(err.message || err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return { places, loading, error };
}
