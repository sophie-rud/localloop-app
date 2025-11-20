import TrackCard from "../../TrackCard/TrackCard.jsx";
import {useEffect} from "react";
import classes from "./TracksList.module.css"
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {Link} from "react-router-dom";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import enrichTracks from "../../../utils/enrichTracks.jsx";
import Button from "../../Button/Button.jsx";

function TracksList() {
    const { tracks, loadTracks, loading: tracksLoading } = useTracksStore();
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

    return(
        <div className={classes['tracks-list']}>
            {enrichedTracks && enrichedTracks.map(track => (
                    <Link to={`/tracks/${track.id}`} key={track.id} className={classes['view-track-link']}>
                        <TrackCard  track={track} />
                    </Link>
            ))}
        </div>
    )
}

export default TracksList;