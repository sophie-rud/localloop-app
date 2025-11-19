import TrackCard from "../../TrackCard/TrackCard.jsx";
import {useEffect} from "react";
import classes from "./TracksList.module.css"
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useFetchTracks from "../../../hooks/use-fetch-tracks.jsx";
import {Link} from "react-router-dom";
import useTracksForDisplay from "../../../hooks/useTrack.jsx";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";

function TracksList() {

    // const {
    //     tracks,
    //     getAllTracks,
    //     loading,
    //     error,
    // } = useTracksStore();
    //
    // useEffect(() => {
    //     getAllTracks();
    // }, [getAllTracks]);
    //
    // if (loading) return <p>Chargement des parcours...</p>;
    // if (error) return <p>Erreur : {error}</p>;

    const { tracks, loadTracks, loading: tracksLoading, error: tracksError } = useTracksStore();
    const { themes, departments, loading: refLoading, error: refError } = useReferenceData();
    const { steps, places, loading: stepsLoading, error: stepsError } = useStepsAndPlaces();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    const loading = tracksLoading || refLoading || stepsLoading;
    const error = tracksError || refError || stepsError;

    const enrichedTracks = useTracksForDisplay(tracks, themes, steps, places, departments);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return(
        <div className={classes['tracks-list']}>
            {enrichedTracks && enrichedTracks.map(track => (
                <Link to={`/tracks/${track.id}`} key={track.id}>
                    <TrackCard track={track} />
                </Link>
            ))}
        </div>
    )
}

export default TracksList;