import MapSearch from '../../components/Map/MapSearch/MapSearch.jsx'
import classes from "./MapPage.module.css";
import useTracksStore from "../../stores/useTracksStore.jsx";
import {useEffect} from "react";

function MapPage() {
    const { tracks, loadTracks, loading, error } = useTracksStore();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!tracks.length) return <p>Aucun parcours</p>;

    return (
        <main>
            <div className='title-block'>
                <h1>LocalLoop</h1>
                <h2>Explorer ce qui se cache autour de vous</h2>
                <p>Partagez vos coins secrets, découvrez ceux des autres !</p>
            </div>
            <section className={classes['map-search-section']} >
                <MapSearch tracks={tracks} />
            </section>
        </main>
    )
}

export default MapPage
