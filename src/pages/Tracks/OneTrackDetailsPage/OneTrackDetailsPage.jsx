import TrackPresentation from "../../../components/TrackPresentation/TrackPresentation.jsx";
import StepOverview from "../../../components/StepOverview/StepOverview.jsx";
import MapTrackView from "../../../components/Map/MapTrackView/MapTrackView.jsx";
import {useParams, Link} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useFetchTracks from "../../../hooks/use-fetch-tracks.jsx";
import {useEffect} from "react";
import classes from "./OneTrackDetailsPage.module.css"
import useTrackDetails from "../../../hooks/useTrackDetails.jsx";

function OneTrackDetailsPage() {
    //
    const { trackId } = useParams();
    const id = Number(trackId);
    const {tracks, selectedTrack, setSelectedTrack} = useTracksStore()

    useEffect(() => {
        const track = tracks.find(t => Number(t.id) === id) || null;
        setSelectedTrack(track);
    }, [id, tracks, setSelectedTrack]);

    // const {request, loading, error} = useFetchTracks();
    //
    // useEffect(() => {
    //     const loadTrack = async () => {
    //         if (tracks.length === 0) await request();
    //         const track = tracks.find(t => Number(t.id) === Number(trackId));
    //         setSelectedTrack(track || null);
    //     };
    //     loadTrack();
    // }, [tracks, trackId]);

    const { steps, loading, error } = useTrackDetails(selectedTrack?.id);

    if (!selectedTrack) return <p>Parcours introuvable</p>;
    if (loading) return <p>Chargement des étapes...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <main className={classes['one-track-page-main']}>
            <section className={classes['track-presentation-section']}>
                <TrackPresentation track={selectedTrack} />
            </section>
            <section className={classes['map-track-section']}>
                <MapTrackView steps={steps}></MapTrackView>
            </section>
            <section className={classes['track-steps-section']}>
                {steps && steps.map(step =>(
                    <Link to={`/tracks/${selectedTrack.id}/step/${step.id}`} key={selectedTrack.id}>
                        <StepOverview key={step.id} step={step} />
                    </Link>
                )) }
            </section>
        </main>
    )
}

export default OneTrackDetailsPage;