import ProfileCard from "../../../components/ProfileCard/ProfileCard.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import TrackCard from "../../../components/TrackCard/TrackCard.jsx";


function AdminProfilePage() {
    return (
        <main className={adminClasses['main-admin']}>
            <h1>Mon profil</h1>
            <section>
                <h2>Mes infos</h2>
                <ProfileCard></ProfileCard>
            </section>
            <section>
                <h2>Mes parcours</h2>
                <TrackCard/>
            </section>
        </main>
    )
}

export default AdminProfilePage;