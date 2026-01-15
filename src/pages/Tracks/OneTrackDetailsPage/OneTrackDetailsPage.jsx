import TrackPresentation from "../../../components/Tracks/TrackPresentation/TrackPresentation.jsx";
import StepOverview from "../../../components/Steps/StepOverview/StepOverview.jsx";
import MapTrackView from "../../../components/Map/MapTrackView/MapTrackView.jsx";
import {useParams, NavLink} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useContext, useEffect} from "react";
import classes from "./OneTrackDetailsPage.module.css"
import {useFavorites} from "../../../hooks/useFavorites.jsx";
import {AuthContext} from "../../../contexts/auth-context.jsx";

function OneTrackDetailsPage() {
    const { id } = useParams();
    const trackId = parseInt(id);
    const { selectedTrack, getStepsForSelectedTrack, loading, error } = useTracksStore()
    const { favoriteIds, loadFavoriteIds, addFavorite, removeFavorite, isTrackFavorite } = useFavorites();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.id) return;
        if (favoriteIds) return;
        loadFavoriteIds();
    }, [user?.id]);

    if (loading) return <p>Chargement du parcours...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!selectedTrack) return <p>Parcours introuvable</p>;

    const steps = getStepsForSelectedTrack();

    const isFavorite = isTrackFavorite(selectedTrack.id);

    const handleFavoriteClick = async () => {
        if (isFavorite) {
            await removeFavorite(selectedTrack.id);
        } else {
            await addFavorite(selectedTrack.id);
        }
        loadFavoriteIds();
    };

    return (
        <main className={classes['one-track-page-main']}>
            <section className={classes['track-presentation-section']}>
                <TrackPresentation
                    track={selectedTrack}
                    steps={steps}
                    handleFavorite={handleFavoriteClick}
                    isFavorite={isFavorite}
                />
            </section>
            <div className={classes['display-manager']}>
                <section className={classes['map-track-section']}>
                    {steps && <MapTrackView steps={steps} />}
                </section>
                <section className={classes['track-steps-section']}>
                    {steps && steps.map(step =>(
                        <NavLink to={`/tracks/${trackId}/steps/${step.id}`} key={step.id}>
                            <StepOverview key={step.id} step={step} />
                        </NavLink>
                    )) }
                </section>
            </div>
        </main>
    )
}

export default OneTrackDetailsPage;