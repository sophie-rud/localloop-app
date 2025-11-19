import ProfileCard from "../../../components/ProfileCard/ProfileCard.jsx";

function UserProfilePage() {
    const user = useUserStore(state => state.user);

    const publishedTracks = tracks.filter(
        track => track.user_id === user.id
    );
    return (
        <main>
            <ProfileCard></ProfileCard>
        </main>
    )
}

export default UserProfilePage;