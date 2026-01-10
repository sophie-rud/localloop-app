import FilterBar from "../../../components/ui/FilterBar/FilterBar.jsx";
import { useEffect, useState } from "react";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import { useSearchParams } from "react-router-dom";

function TracksPage() {
    const { filteredTracks, loadFilteredTracks, loading, error } = useTracksStore();
    const themes = [...new Map(filteredTracks.map(track => [track.theme?.id, track.theme])).values()];
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const [filters, setFilters] = useState({
        difficulty: null,
        duration: null,
        distance: null,
    });

    useEffect(() => {
        loadFilteredTracks({
            query,
            ...filters,
        });
    }, [query, filters, loadFilteredTracks]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <main>
            <h1>Les Parcours</h1>
            <div>
                <FilterBar filters={filters} setFilters={setFilters} themes={themes} />
            </div>
            {filteredTracks.length === 0 && <p>Aucun parcours ne correspond aux critères recherchés :(</p>}
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