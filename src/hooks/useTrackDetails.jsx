import { useState, useEffect } from "react";
import { getRequest } from "../services/request";

function useTrackDetails(trackId) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!trackId) {
            setSteps([]);
            setLoading(false);
            return;
        }

        async function loadTrackDetails() {
            setLoading(true);
            setError(null);

            try {
                const trackSteps = await getRequest(`/steps?track_id=${trackId}`);
                const validSteps = trackSteps.filter(s => s.place_id !== null);

                const places = await Promise.all(
                    validSteps.map(s => getRequest(`/places/${s.place_id}`))
                );

                const enrichedSteps = trackSteps.map(step => {
                    const place = places.find(p => Number(p.id) === Number(step.place_id));
                    return {
                        ...step,
                        place: place || null,
                    }
                });

                setSteps(enrichedSteps);
            } catch (err) {
                setError(err.message || err);
            } finally {
                setLoading(false);
            }
        }

        loadTrackDetails();
    }, [trackId]);

    return { steps, loading, error };
}

export default useTrackDetails;
