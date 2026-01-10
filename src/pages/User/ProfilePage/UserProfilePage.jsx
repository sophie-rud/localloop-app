import ProfileCard from "../../../components/ProfileCard/ProfileCard.jsx";
import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useContext, useState} from "react";
import classes from "./UserProfilePage.module.css"
import {AuthContext} from "../../../contexts/auth-context.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import {deleteRequest, putRequest} from "../../../services/request.jsx";
import UserEditForm from "../../../components/Forms/UserForm/UserEditForm.jsx";
import CommonModal from "../../../components/ui/CommonModal/CommonModal.jsx";

function UserProfilePage() {
    const { removeTrack } = useTracksStore();
    const navigate = useNavigate();
    const { user, setUser, isLogin } = useContext(AuthContext);
    const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);

    if (isLogin === undefined) return <p>Chargement...</p>;
    if (!isLogin) return <p>Connectez-vous pour accéder à votre profil</p>;

    // Actions on current user data
    const editProfileHandler = async (userData) => {
        const formData = new FormData();

        formData.append('username', userData.username);
        formData.append('email', userData.email);

        // Add file if a new one has been selected
        if (userData.avatar) {
            formData.append('avatar', userData.avatar);
        }

        const updatedUser = await putRequest("/me", formData);
        setUser(updatedUser);
        setIsEditAccountOpen(false);
    };

    const deleteProfileHandler = async () => {
        const confirmDelete = window.confirm("Voulez-vous supprimer votre compte ? Cette action est irréversible.");
        if (!confirmDelete) return;

        await deleteRequest("/me");
        setUser(null);
        navigate("/");
    };

    // Tracks display filters
    const publishedTracks = (user?.createdTracks ?? []).filter(
        (track) => track.isPublished === true
    );

    const nonPublishedTracks = user?.createdTracks?.filter(
        (track) => track.isPublished === false
    ) ?? [];

    // Actions on user tracks
    const createTrackHandler = () => {
        if (user.roleId === 1) {
            navigate(`/user/tracks/create`)
        } else if (user.roleId === 2) {
            navigate(`/admin/tracks/create`)
        }
    }

    const editTrackHandler = (track) => {
        if (user.roleId === 1) {
            navigate(`/user/tracks/${track.id}/edit`);
        } else if (user.roleId === 2) {
            navigate(`/admin/tracks/${track.id}/edit`);
        }
    };

    const deleteTrackHandler = async (track) => {
        await removeTrack(track.id);
    };

    return (
        <main className={user?.roleId === 2 ? adminClasses['main-admin'] : ''}>
            <h1>Hello {user.username} !</h1>
            <section>
                <ProfileCard
                    user={user}
                    onEditClick={() => setIsEditAccountOpen(true)}
                />
                {isEditAccountOpen &&
                    <CommonModal onClose={() => setIsEditAccountOpen(false)}>
                        <UserEditForm
                            onSubmit={editProfileHandler}
                            onClose={() => setIsEditAccountOpen(false)}
                            onDelete={deleteProfileHandler}
                        />
                    </CommonModal>
                }
            </section>
            <Button type="button" onClick={createTrackHandler} className={'green-btn'}>+ Publier un parcours</Button>
            <section className={classes['my-tracks-section']}>
                <h2>Mes parcours</h2>
                <div>
                    <h3>Parcours publiés</h3>
                    <TracksList
                        tracks={publishedTracks}
                        onEdit={editTrackHandler}
                        onDelete={deleteTrackHandler}
                        >
                    </TracksList>
                </div>
                <div>
                    <h3>Parcours non publiés</h3>
                    <TracksList
                        tracks={nonPublishedTracks}
                        onEdit={editTrackHandler}
                        onDelete={deleteTrackHandler}
                    />
                </div>
            </section>
        </main>
    )
}

export default UserProfilePage;