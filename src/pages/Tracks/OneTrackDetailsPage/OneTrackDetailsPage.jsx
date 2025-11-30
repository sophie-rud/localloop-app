import TrackPresentation from "../../../components/TrackPresentation/TrackPresentation.jsx";
import StepOverview from "../../../components/StepOverview/StepOverview.jsx";
import MapTrackView from "../../../components/Map/MapTrackView/MapTrackView.jsx";
import {useParams, Link} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useEffect} from "react";
import classes from "./OneTrackDetailsPage.module.css"
import useTrackDetails from "../../../hooks/useTrackDetails.jsx";

function OneTrackDetailsPage() {
    const { id } = useParams();
    const trackId = Number(id);
    const {tracks, setSelectedTrack} = useTracksStore()

    useEffect(() => {
        const track = tracks.find(t => Number(t.id) === trackId) || null;
        setSelectedTrack(track);
    }, [trackId, tracks, setSelectedTrack]);

    const { steps, track, loading, error } = useTrackDetails(trackId);

    if (loading) return <p>Chargement des étapes...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!track) return <p>Parcours introuvable</p>;


    return (
        <main className={classes['one-track-page-main']}>
            <section className={classes['track-presentation-section']}>
                <TrackPresentation track={track} steps={steps} />
            </section>
            <div className={classes['display-manager']}>
                <section className={classes['map-track-section']}>
                    {steps && <MapTrackView steps={steps}></MapTrackView>}
                </section>
                <section className={classes['track-steps-section']}>
                    {steps && steps.map(step =>(
                        <Link to={`/tracks/${trackId}/steps/${step.id}`} key={step.id}>
                            <StepOverview key={step.id} step={step} />
                        </Link>
                    )) }
                </section>
            </div>
        </main>
    )
}

export default OneTrackDetailsPage;