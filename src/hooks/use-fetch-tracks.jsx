import useTracksStore from "../stores/useTracksStore.jsx";
import {useState} from "react";

function useFetchTracks() {

    const { setTracks } = useTracksStore();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = async () => {
        setLoading(true);
        try {
            const baseUrl = "http://localhost:3000";
            const urls = [
                `${baseUrl}/tracks`,
                `${baseUrl}/steps`,
                `${baseUrl}/places`,
                `${baseUrl}/themes`,
                `${baseUrl}/departments`,
            ];

            const responses = await Promise.all(
                urls.map(async (url) => {
                        const res = await fetch(url);
                        if (!res.ok) throw new Error(`Error fetch ${url} : ${res.status}`);
                        return res.json();
                })
            );

            const [tracks, steps, places, themes, departments]  = responses;

            const enrichedTracks = tracks.map((track) => {
                const theme = themes.find(theme => Number(theme.id) === Number(track.theme_id));
                const trackSteps = steps
                    .filter((step) => Number(step.track_id) === Number(track.id))
                    .map((step) => {
                        const place = places.find(place => Number(place.id) === Number(step.place_id));
                        const department = place ? departments.find((department) => Number(department.id) === Number(place.department_id)) : null;
                        return {
                            ...step,
                            place: place ? {...place, department } : null,
                        };
                    });

                return {
                    ...track,
                    theme,
                    steps: trackSteps,
                };
            });
            setTracks(enrichedTracks);
        } catch(err){
            setError(err)
        }  finally {
            setLoading(false);
        }
    }

    return { error, loading, request};
}

export default useFetchTracks;