import ProfileCard from "../../../components/ProfileCard/ProfileCard.jsx";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useContext, useEffect} from "react";
import classes from "./UserProfilePage.module.css"
import {AuthContext} from "../../../contexts/auth-context.jsx";
import useUsersStore from "../../../stores/useUsersStore.jsx";

function UserProfilePage() {
    const { tracks, setSelectedTrack, removeTrack } = useTracksStore();
    const { loadUserById } = useUsersStore();
    const navigate = useNavigate();
    const { user, isLogin } = useContext(AuthContext);
    
    useEffect(() => {
        loadUserById(user.id);
    }, [loadUserById, user.id]);

    if (isLogin === undefined) return <p>Chargement...</p>;
    if (!isLogin) return <p>Connectez-vous pour accéder à votre profil</p>;

    const publishedTracks = tracks.filter(
        (track) => track.userId === user.id && track.isPublished === true
    );

    const nonPublishedTracks = tracks.filter(
        (track) => track.userId === user.id && track.isPublished === false
    );

    const handleCreate = () => {
        navigate(`/tracks/create`)
    }

    const handleEdit = (track) => {
        setSelectedTrack(track);
        navigate(`/tracks/${track.id}/edit`);
    };

    const handleDelete = async (track) => {
        await removeTrack(track.id);
    };

    return (
        <main>
            <h1>Hello {user.username} !</h1>
            <section>
                <ProfileCard />
            </section>
            <Button type="button" onClick={handleCreate} className={'green-btn'}>+ Publier un parcours</Button>
            <section className={classes['my-tracks-section']}>
                <h2>Mes parcours</h2>
                <div>
                    <h3>Parcours publiés</h3>
                    <TracksList
                        tracks={publishedTracks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        >
                    </TracksList>
                </div>
                <div>
                    <h3>Parcours non publiés</h3>
                    <TracksList
                        tracks={nonPublishedTracks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </section>
        </main>
    )
}

export default UserProfilePage;