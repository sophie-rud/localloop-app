import FilterBar from "../../../components/FilterBar/FilterBar.jsx";
import {useEffect, useState} from "react";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import enrichTracks from "../../../utils/enrichTracks.jsx";
import {Outlet, useOutletContext, useSearchParams} from "react-router-dom";

function TracksPage() {

    const { tracks, loadTracks, loading: tracksLoading } = useTracksStore();
    const { steps, places, loading: stepsLoading } = useStepsAndPlaces();
    const { themes, departments, loading: refLoading } = useReferenceData();
    const { searchTerm } = useOutletContext();
    const [params] = useSearchParams();
    const query = params.get("query");

    useEffect(() => {
        if (query) {
            loadTracks(query);
        } else {
            loadTracks();
        }
    }, [loadTracks, query]);

    const [filters, setFilters] = useState({
        difficulty: "",
        duration: "",
        distance: "",
        theme_id: ""
    });

    const loading = tracksLoading || stepsLoading || refLoading;
    if (loading) return <p>Chargement...</p>;

    if (!tracks.length || !steps.length || !places.length || !themes.length || !departments.length) {
        return <p>Pas de données disponibles</p>;
    }

    const enrichedTracks = enrichTracks(tracks, { steps, places, departments, themes });

    // SEARCH BAR FILTER
    const termToSearch = searchTerm?.toLowerCase() || "";
    const searchBarFilteredTracks = enrichedTracks.filter(track =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase())||
        (track.presentation?.toLowerCase().includes(termToSearch)) ||
        (track.place?.name.toLowerCase().includes(termToSearch)) ||
        (track.department?.name.toLowerCase().includes(termToSearch))
    );

    // TRACKS FILTERS
    const filteredTracks = searchBarFilteredTracks.filter(track => {
        // difficulty filter
        if (filters.difficulty && track.difficulty !== filters.difficulty) {
            return false;
        }

        // duration filter
        if (filters.duration) {
            const d = track.duration;

            if (filters.duration === "courte" && d > 60) return false;
            if (filters.duration === "moyenne" && (d < 60 || d > 180)) return false;
            if (filters.duration === "longue" && (d < 180 || d > 360)) return false;
            if (filters.duration === "extralongue" && d < 360) return false;
        }

        // distance filter
        if (filters.distance) {
            const km = Number(track.distance);

            if (filters.distance === "courte" && km > 5) return false;
            if (filters.distance === "moyenne" && (km < 5 || km > 10)) return false;
            if (filters.distance === "longue" && (km < 10 || km > 15)) return false;
            if (filters.distance === "extralongue" && km < 15) return false;
        }

        return true;
    });

    return (
        <main>
            <h1>Les Parcours</h1>
            <div>
                <FilterBar filters={filters} setFilters={setFilters} themes={themes} />
            </div>
            <section>
                {themes.map(theme => (
                    <div key={theme.id}>
                        <h2>{theme.name}</h2>
                        <TracksList tracks={filteredTracks.filter(track => parseInt(track.theme_id) === parseInt(theme.id))}></TracksList>
                    </div>
            ))}
            </section>
        </main>
    )
}

export default TracksPage;