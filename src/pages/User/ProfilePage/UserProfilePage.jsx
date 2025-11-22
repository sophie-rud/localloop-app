import ProfileCard from "../../../components/ProfileCard/ProfileCard.jsx";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import Button from "../../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useEffect} from "react";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import enrichTracks from "../../../utils/enrichTracks.jsx";

function UserProfilePage() {
    const { tracks, loadTracks, setSelectedTrack, removeTrack } = useTracksStore();
    const { steps, places } = useStepsAndPlaces();
    const { themes, departments} = useReferenceData();
    const navigate = useNavigate();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    const renderEditButtons = (track) => (
        <>
            <Button
                type="button"
                className="green-btn"
                onClick={() => {
                    handleClickEdit();
                    setSelectedTrack(track);
                }}
            >
                Editer
            </Button>

            <Button
                type="button"
                className="blue-btn"
                onClick={() => removeTrack(track.id)}
            >
                Supprimer
            </Button>
        </>
    );

    // const user = useUserStore(state => state.user);
    //
    // const publishedTracks = tracks.filter(
    //     track => track.user_id === user.id
    // );

    const userId = 2;
    const publishedTracks = tracks.filter(
        (track) => track.user_id === userId && track.is_published === true
    );
    const enrichedPublishedTracks = enrichTracks(publishedTracks, { steps, places, departments, themes });

    const nonPublishedTracks = tracks.filter(
        (track) => track.user_id === userId && track.is_published === false
    );
    const enrichedNonPublishedTracks = enrichTracks(nonPublishedTracks, { steps, places, departments, themes });


    const handleClickCreate = () => {
        navigate(`/user/${userId}/tracks/create`)
    }

    const handleClickEdit = () => {
        navigate(`/user/:id/tracks/:trackId/edit`);
    }

    return (
        <main>
            <h1>Hello lily.stadt68 !</h1>
            <section>
                <ProfileCard></ProfileCard>
            </section>
            <Button type="button" onClick={handleClickCreate} className={'green-btn'}>+ Ajouter un parcours</Button>
            <section>
                <h2>Mes parcours</h2>
                <div>
                    <h3>Parcours publiés</h3>
                    <TracksList tracks={enrichedPublishedTracks} renderCardChildren={renderEditButtons} >
                    </TracksList>
                </div>
                <div>
                    <h3>Parcours non publiés</h3>
                    <TracksList tracks={enrichedNonPublishedTracks} renderCardChildren={renderEditButtons} >
                    </TracksList>
                </div>
            </section>
        </main>
    )
}

export default UserProfilePage;