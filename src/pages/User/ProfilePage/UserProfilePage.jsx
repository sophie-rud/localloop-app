import ProfileCard from "../../../components/ProfileCard/ProfileCard.jsx";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useContext} from "react";
import classes from "./UserProfilePage.module.css"
import {AuthContext} from "../../../contexts/auth-context.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";

function UserProfilePage() {
    const { setSelectedTrack, removeTrack } = useTracksStore();
    const navigate = useNavigate();
    const { user, isLogin } = useContext(AuthContext);

    if (isLogin === undefined) return <p>Chargement...</p>;
    if (!isLogin) return <p>Connectez-vous pour accéder à votre profil</p>;

    const publishedTracks = (user?.createdTracks ?? []).filter(
        (track) => track.isPublished === true
    );

    const nonPublishedTracks = user?.createdTracks?.filter(
        (track) => track.isPublished === false
    ) ?? [];

    const handleCreate = () => {
        if (user.roleId === 1) {
            navigate(`/user/tracks/create`)
        } else if (user.roleId === 2) {
            navigate(`/admin/tracks/create`)
        }
    }

    const handleEdit = (track) => {
        setSelectedTrack(track);
        if (user.roleId === 1) {
            navigate(`/user/tracks/${track.id}/edit`);
        } else if (user.roleId === 2) {
            navigate(`/admin/tracks/${track.id}/edit`);
        }
    };

    const handleDelete = async (track) => {
        await removeTrack(track.id);
    };

    return (
        <main className={user?.roleId === 2 ? adminClasses['main-admin'] : ''}>
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