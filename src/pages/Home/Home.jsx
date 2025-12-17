import MapSearch from "../../components/Map/MapSearch/MapSearch.jsx";
import TracksList from "../../components/Tracks/TracksList/TracksList.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import useTracksStore from "../../stores/useTracksStore.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import classes from "./Home.module.css";

function Home() {

    const { tracks, loadTracks, loading, error } = useTracksStore();
    const navigate = useNavigate();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!tracks.length) return <p>Aucun parcours</p>;

    const tracksToDisplay = tracks.slice(0, 5);

    return (
        <main className={classes['main-home']}>
            <div className='title-block'>
                <h1>LocalLoop</h1>
                <h2>Explorer ce qui se cache autour de vous</h2>
                <p>Partagez vos coins secrets, découvrez ceux des autres !</p>
            </div>
            <section>
                    <TracksList tracks={tracksToDisplay} />
                <Button type="button" className={'blue-btn'} onClick={() => navigate("/tracks")}>Voir les parcours</Button>
            </section>
            <section>
                <div>
                    <MapSearch tracks={tracks} />
                </div>
                <Button type="button" className={'blue-btn'} onClick={() => navigate("/map")}>Voir la carte</Button>
            </section>
        </main>
    )
}

export default Home
