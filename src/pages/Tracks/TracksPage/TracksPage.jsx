import FilterBar from "../../../components/FilterBar/FilterBar.jsx";
import {useState} from "react";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";

function TracksPage() {
    const [filters, setFilters] = useState({
        difficulty: "",
        duration: "",
        distance: "",
        theme: ""
    });

    // Filtrer les parcours selon les filtres activés
    // const filteredTracks = TracksData.filter(tracks => {
    //     return (
    //         (filters.difficulty === "" || tracks.difficulty === filters.difficulty) &&
    //         (filters.duration === "" || tracks.duration === filters.duration) &&
    //         (filters.distance === "" || tracks.distance === filters.distance) &&
    //         (filters.theme === "" || tracks.theme === filters.theme)
    //     );
    // });

    return (
        <main>
            <h1>Les Parcours</h1>
            <div>
                <FilterBar filters={filters} setFilters={setFilters} />
            </div>
            <div>
                <TracksList></TracksList>
            </div>
        {/*          <div className="tracks-list">
        {filteredTracks.length > 0 ? (
          filteredTracks.map(tracks => (
            <div key={tracks.id} className="tracks-item">
              <h3>{tracks.name}</h3>
              <p>Difficulté: {tracks.difficulty}</p>
              <p>Durée: {tracks.duration}</p>
              <p>Distance: {tracks.distance}</p>
              <p>Thème: {tracks.theme}</p>
            </div>
          ))
        ) : (
          <p>Aucun parcours ne correspond aux filtres.</p>
        )}
      </div>*/}
        </main>
    )
}

export default TracksPage;