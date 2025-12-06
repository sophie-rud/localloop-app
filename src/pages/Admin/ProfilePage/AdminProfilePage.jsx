import ProfileCard from "../../../components/ProfileCard/ProfileCard.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import classes from "./AdminProfilePage.module.css";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import {useEffect} from "react";
import enrichTracks from "../../../utils/enrichTracks.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../../components/ui/Button/Button.jsx";

function AdminProfilePage() {

    const { tracks, loadTracks, setSelectedTrack, removeTrack } = useTracksStore();
    const { steps, places } = useStepsAndPlaces();
    const { themes, departments} = useReferenceData();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    const userId = 2;
    const publishedTracks = tracks.filter(
        (track) => track.user_id === userId && track.isPublished === true
    );
    const enrichedPublishedTracks = enrichTracks(publishedTracks, { steps, places, departments, themes });

    const nonPublishedTracks = tracks.filter(
        (track) => track.user_id === userId && track.isPublished === false
    );
    const enrichedNonPublishedTracks = enrichTracks(nonPublishedTracks, { steps, places, departments, themes });


    const handleCreate = () => {
        navigate(`/user/${id}/tracks/create`)
    }

    const handleEdit = (track) => {
        setSelectedTrack(track);
        navigate(`/user/${id}/tracks/${track.id}/edit`);
    };

    const handleDelete = async (track) => {
        await removeTrack(track.id);
    };

    return (
        <main className={adminClasses['main-admin']}>
            <h1>Mon profil</h1>
            <section>
                <ProfileCard />
            </section>
            <Button type="button" onClick={handleCreate} className={'green-btn'}>+ Publier un parcours</Button>
            <section className={classes['my-tracks-section']}>
                <h2>Mes parcours</h2>
                <div>
                    <h3>Parcours publiés</h3>
                    <TracksList
                        tracks={enrichedPublishedTracks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    >
                    </TracksList>
                </div>
                <div>
                    <h3>Parcours non publiés</h3>
                    <TracksList
                        tracks={enrichedNonPublishedTracks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    >
                    </TracksList>
                </div>
            </section>
        </main>
    )
}

export default AdminProfilePage;