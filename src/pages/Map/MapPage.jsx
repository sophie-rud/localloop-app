import MapSearch from '../../components/Map/MapSearch/MapSearch.jsx'
import classes from "../Tracks/OneTrackDetailsPage/OneTrackDetailsPage.module.css";
import useTracksStore from "../../stores/useTracksStore.jsx";
import useStepsAndPlaces from "../../hooks/useStepsAndPlacesData.jsx";
import useReferenceData from "../../hooks/useThemesAndDepartmentData.jsx";
import {useEffect} from "react";
import enrichTracks from "../../utils/enrichTracks.jsx";

function MapPage() {
    const { tracks, loadTracks, setSelectedTrack, selectedTrack, loading: tracksLoading } = useTracksStore();
    const { steps, places, loading: stepsLoading } = useStepsAndPlaces();
    const { themes, departments, loading: refLoading } = useReferenceData();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    const loading = tracksLoading || stepsLoading || refLoading;
    if (loading) return <p>Chargement…</p>;

    if (!tracks.length || !steps.length || !places.length || !themes.length || !departments.length) {
        return <p>Pas de données disponibles</p>;
    }

    const enrichedTracks = enrichTracks(tracks, { steps, places, departments, themes });

    return (
        <main>
            <h1>LocalLoop</h1>
            <h2>Explorer ce qui se cache autour de vous</h2>
            <p>Partagez vos coins secrets, découvrez ceux des autres !</p>
            <section className={classes['map-search-section']} >
                <MapSearch tracks={enrichedTracks} />
            </section>
        </main>
    )
}

export default MapPage
