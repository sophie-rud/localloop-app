import TrackCard from "../../components/TrackCard/TrackCard.jsx";

function Home() {
    return (
        <main>
            <h1>LocalLoop</h1>
            <h2>Explorer ce qui se cache autour de vous</h2>
            <p>Partagez vos coins secrets, découvrez ceux des autres !</p>
            <div>
            {/* TODO : Map Interface */}
            </div>
            <div>
                <TrackCard/>
            </div>
        </main>
    )
}

export default Home
