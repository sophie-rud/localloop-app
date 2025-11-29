import { useState, useEffect } from "react";
import { getRequest } from "../services/request";
import useReferenceData from "./useThemesAndDepartmentData.jsx";

function useTrackDetails(trackId) {
    const [steps, setSteps] = useState([]);
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { themes, departments } = useReferenceData();

    useEffect(() => {
        if (!trackId || departments.length === 0) {
            setTrack(null);
            setSteps([]);
            setLoading(false);
            return;
        }

        if (departments.length === 0 || themes.length === 0) return;

        async function loadTrackDetails() {
            setLoading(true);
            setError(null);

            try {
                const selectedTrack = await getRequest(`/tracks/${trackId}`);

                const trackSteps = await getRequest(`/steps?track_id=${trackId}`);
                const validSteps = trackSteps.filter(s => s.place_id !== null);

                const places = await Promise.all(
                    validSteps.map(s => getRequest(`/places/${s.place_id}`))
                );

                const theme = selectedTrack.theme_id
                    ? themes.find(t => Number(t.id) === Number(selectedTrack.theme_id))
                    : null;

                const enrichedSteps = trackSteps.map(step => {
                    const place = places.find(p => Number(p.id) === Number(step.place_id));
                    const department = place
                        ? departments.find(d => Number(d.id) === Number(place.department_id))
                        : null;
                    return {
                        ...step,
                        place: place ? { ...place, department } : null
                    }
                });

                setTrack({ ...selectedTrack, theme });
                setSteps(enrichedSteps);
            } catch (err) {
                setError(err.message || err);
            } finally {
                setLoading(false);
            }
        }

        loadTrackDetails();
    }, [trackId, departments, themes]);

    return { steps, track, loading, error };
}

export default useTrackDetails;
