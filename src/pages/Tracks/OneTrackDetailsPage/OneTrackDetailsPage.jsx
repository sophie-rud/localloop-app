import TrackPresentation from "../../../components/Tracks/TrackPresentation/TrackPresentation.jsx";
import StepOverview from "../../../components/Steps/StepOverview/StepOverview.jsx";
import MapTrackView from "../../../components/Map/MapTrackView/MapTrackView.jsx";
import {useParams, Link} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useEffect} from "react";
import classes from "./OneTrackDetailsPage.module.css"

function OneTrackDetailsPage() {
    const { id } = useParams();
    const trackId = parseInt(id);
    const { selectedTrack, loadTrackById, loading, error } = useTracksStore()

    useEffect(() => {
        if (trackId) {
            loadTrackById(trackId);
        }
    }, [trackId, loadTrackById]);

    if (loading) return <p>Chargement du parcours...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!selectedTrack) return <p>Parcours introuvable</p>;

    const steps = selectedTrack.steps || [];

    return (
        <main className={classes['one-track-page-main']}>
            <section className={classes['track-presentation-section']}>
                <TrackPresentation track={selectedTrack} />
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