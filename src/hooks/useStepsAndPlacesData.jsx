import { useState, useEffect } from "react";
import { getRequest } from "../services/request";

export default function useStepsAndPlaces() {
    const [steps, setSteps] = useState([]);
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const [stepsData, placesData] = await Promise.all([
                    getRequest("/steps"),
                    getRequest("/places"),
                ]);
                setSteps(stepsData);
                setPlaces(placesData);
            } catch (err) {
                setError(err.message || err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return { steps, places, loading, error };
}
