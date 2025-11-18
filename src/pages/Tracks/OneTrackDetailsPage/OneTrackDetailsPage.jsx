import TrackPresentation from "../../../components/TrackPresentation/TrackPresentation.jsx";
import StepOverview from "../../../components/StepOverview/StepOverview.jsx";
import MapTrackView from "../../../components/Map/MapTrackView/MapTrackView.jsx";
import {useParams} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useFetchTracks from "../../../hooks/use-fetch-tracks.jsx";
import {useEffect} from "react";
import classes from "./OneTrackDetailsPage.module.css"

function OneTrackDetailsPage() {

    const {trackId} = useParams();
    const {tracks, selectedTrack, setSelectedTrack} = useTracksStore()
    const {request, loading, error} = useFetchTracks();

    useEffect(() => {
        const loadTrack = async () => {
            if (tracks.length === 0) await request();
            const track = tracks.find(t => Number(t.id) === Number(trackId));
            setSelectedTrack(track || null);
        };
        loadTrack();
    }, [tracks, trackId]);

    if (loading) return <p>Chargement du parcours...</p>;
    if (error) return <p>Erreur: {error.message}</p>;
    if (!selectedTrack) return <p>Parcours introuvable</p>;

    return (
        <main className={classes['one-track-page-main']}>
            <section className={classes['track-presentation-section']}>
                <TrackPresentation track={selectedTrack} />
            </section>
            <section className={classes['map-track-section']}>
                <MapTrackView track={selectedTrack}></MapTrackView>
            </section>
            <section className={classes['track-steps-section']}>
                {selectedTrack.steps && selectedTrack.steps.map(step =>(
                    <StepOverview key={step.id} step={step} />
                )) }
            </section>
        </main>
    )
}

export default OneTrackDetailsPage;