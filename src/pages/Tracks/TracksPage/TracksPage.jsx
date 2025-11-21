import FilterBar from "../../../components/FilterBar/FilterBar.jsx";
import {useEffect, useState} from "react";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import enrichTracks from "../../../utils/enrichTracks.jsx";

function TracksPage() {

    const { tracks, loadTracks, loading: tracksLoading } = useTracksStore();
    const { steps, places, loading: stepsLoading } = useStepsAndPlaces();
    const { themes, departments, loading: refLoading } = useReferenceData();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    // const loading = tracksLoading || stepsLoading || refLoading;
    // if (loading) return <p>Chargement…</p>;
    //
    // if (!tracks.length || !steps.length || !places.length || !themes.length || !departments.length) {
    //     return <p>Pas de données disponibles</p>;
    // }

    const enrichedTracks = enrichTracks(tracks, { steps, places, departments, themes });

    // const [filters, setFilters] = useState({
    //     difficulty: "",
    //     duration: "",
    //     distance: "",
    //     theme: ""
    // });
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
                {/*<FilterBar filters={filters} setFilters={setFilters} />*/}
            </div>
            <section>
                {themes.map(theme => (
                    <div>
                        <h2>{theme.name}</h2>
                        <TracksList tracks={enrichedTracks.filter(track => parseInt(track.theme_id) === parseInt(theme.id))}></TracksList>
                    </div>
            ))}
            </section>

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