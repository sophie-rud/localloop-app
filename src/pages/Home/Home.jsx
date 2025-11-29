import MapSearch from "../../components/Map/MapSearch/MapSearch.jsx";
import TracksList from "../../components/Tracks/TracksList/TracksList.jsx";
import Button from "../../components/Button/Button.jsx";
import useTracksStore from "../../stores/useTracksStore.jsx";
import useStepsAndPlaces from "../../hooks/useStepsAndPlacesData.jsx";
import useReferenceData from "../../hooks/useThemesAndDepartmentData.jsx";
import {useEffect} from "react";
import enrichTracks from "../../utils/enrichTracks.jsx";
import {useNavigate} from "react-router-dom";
import classes from "./Home.module.css";

function Home() {

    const { tracks, loadTracks, loading: tracksLoading } = useTracksStore();
    const { steps, places, loading: stepsLoading } = useStepsAndPlaces();
    const { themes, departments, loading: refLoading } = useReferenceData();
    const navigate = useNavigate();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    const loading = tracksLoading || stepsLoading || refLoading;
    if (loading) return <p>Chargement…</p>;

    if (!tracks.length || !steps.length || !places.length || !themes.length || !departments.length) {
        return <p>Pas de données disponibles</p>;
    }

    const tracksToDisplay = tracks.slice(0, 5);
    const enrichedTracks = enrichTracks(tracksToDisplay, { steps, places, departments, themes });

    return (
        <main className={classes['main-home']}>
            <div className='title-block'>
                <h1>LocalLoop</h1>
                <h2>Explorer ce qui se cache autour de vous</h2>
                <p>Partagez vos coins secrets, découvrez ceux des autres !</p>
            </div>
            <section>
                    <TracksList tracks={enrichedTracks} />
                <Button type="button" className={'blue-btn'} onClick={() => navigate("/tracks")}>Voir les parcours</Button>
            </section>
            <section>
                <div>
                    <MapSearch tracks={enrichedTracks} />
                </div>
                <Button type="button" className={'blue-btn'} onClick={() => navigate("/map")}>Voir la carte</Button>
            </section>
        </main>
    )
}

export default Home
