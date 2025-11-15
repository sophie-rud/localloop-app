import MapSearch from "../../components/Map/MapSearch/MapSearch.jsx";
import TracksList from "../../components/Tracks/TracksList/TracksList.jsx";
import Button from "../../components/Button/Button.jsx";
import classes from'./Home.module.css';

function Home() {

    return (
        <main>
            <div className={classes['title-block']}>
                <h1>LocalLoop</h1>
                <h2>Explorer ce qui se cache autour de vous</h2>
                <p>Partagez vos coins secrets, découvrez ceux des autres !</p>
            </div>
            <section>
                    <TracksList />
                <Button type="button" className={'blue-btn'}>Voir les parcours</Button>
            </section>
            <section>
                <div>
                    <MapSearch />
                </div>
                <Button type="button" className={'blue-btn'}>Voir la carte</Button>
            </section>
        </main>
    )
}

export default Home
