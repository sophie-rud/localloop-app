import FilterBar from "../../../components/ui/FilterBar/FilterBar.jsx";
import { useEffect, useState } from "react";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import { useSearchParams } from "react-router-dom";

function TracksPage() {

    const { tracks, loadTracks, getStepsForSelectedTrack, loading, error } = useTracksStore();
    const [params] = useSearchParams();
    const query = params.get("query");
    const themes = [...new Map(tracks.map(track => [track.theme?.id, track.theme])).values()];

    useEffect(() => {
        if (query) {
            loadTracks(query);
        } else {
            loadTracks();
        }
    }, [loadTracks, query]);

    const steps = getStepsForSelectedTrack();

    const [filters, setFilters] = useState({
        difficulty: "",
        duration: "",
        distance: "",
        theme_id: ""
    });

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!tracks.length) return <p>Aucun parcours</p>;

    // SEARCH BAR FILTER
    const searchBarFilteredTracks = tracks.filter(track => {
        if (!query) return true;
        const term = query.toLowerCase();

        const firstPlace = steps?.[0]?.place;
        const department = firstPlace?.department;

        return (
            track.title?.toLowerCase().includes(term) ||
            track.presentation?.toLowerCase().includes(term) ||
            firstPlace?.name?.toLowerCase().includes(term) ||
            department?.name?.toLowerCase().includes(term)
        );
    });


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

    console.log(tracks)
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
                        <TracksList
                            tracks={filteredTracks.filter(track => parseInt(track.theme?.id) === parseInt(theme.id))}
                        />
                    </div>
                ))}
            </section>

        </main>
    )
}

export default TracksPage;