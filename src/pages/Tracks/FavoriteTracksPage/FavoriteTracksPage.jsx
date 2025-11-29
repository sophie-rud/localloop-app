import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useUsersStore from "../../../stores/useUsersStore.jsx";
import {useEffect} from "react";
import enrichTracks from "../../../utils/enrichTracks.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";

function FavoriteTracksPage() {
    const {tracks, loadTracks} = useTracksStore();
    const {currentUser} = useUsersStore();
    const { steps, places } = useStepsAndPlaces();
    const { themes, departments} = useReferenceData();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);
    
    const favoriteTracks = tracks.filter((track) =>
        currentUser.favorites.includes(track.id)
    );

    const enrichedFavoriteTracks = enrichTracks(favoriteTracks, { steps, places, departments, themes });

    if (tracks.length === 0) {
        return <p>Pas de parcours</p>
    }
    if (favoriteTracks.length === 0) {
        return <p>Vous n'avez pas encore de favoris</p>
    }

    return (
        <main>
            <h1>Mes parcours favoris</h1>
            <div>
                <TracksList tracks={enrichedFavoriteTracks} />
            </div>

        </main>
    )
}

export default FavoriteTracksPage;