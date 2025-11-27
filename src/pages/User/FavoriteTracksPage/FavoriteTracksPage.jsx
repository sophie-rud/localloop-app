import useTracksStore from "../../../stores/useTracksStore.jsx";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import TrackCard from "../../../components/TrackCard/TrackCard.jsx";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import {useEffect} from "react";
import useTracksForDisplay from "../../../hooks/useTrack.jsx";

function FavoriteTracksPage() {
    // const tracks = useTracksStore(state => state.tracks);
    // const favoritesIds = useUserStore(state => state.user?.favorites || []);
    //
    // const favoriteTracks = tracks.filter(t => favoritesIds.includes(t.id));


    return (
        <main>
            <h1>Parcours favoris</h1>
            <div>
                <TracksList />
                {/*<TrackCard></TrackCard>*/}
            </div>

        </main>
    )
}

export default FavoriteTracksPage;