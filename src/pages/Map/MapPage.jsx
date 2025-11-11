import MapSearch from '../../components/Map/MapSearch/MapSearch.jsx'

function MapPage() {
    return (
        <main>
            <h1>LocalLoop</h1>
            <h2>Explorer ce qui se cache autour de vous</h2>
            <p>Partagez vos coins secrets, découvrez ceux des autres !</p>
            <div>
                <MapSearch />
            </div>
        </main>
    )
}

export default MapPage
