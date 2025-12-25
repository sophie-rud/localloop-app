import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/ui/Button/Button.jsx";
import SearchBar from "../../../components/ui/SearchBar/SearchBar.jsx";
import TrackTable from "../../../components/Admin/Tables/TrackTable/TrackTable.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useNavigate} from "react-router-dom";

function TracksDashboardPage() {

    const { setSelectedTrack, removeTrack} = useTracksStore();
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate(`/admin/tracks/create`)
    }

    const handleEdit = (track) => {
        setSelectedTrack(track);
        navigate(`/admin/tracks/${track.id}/edit`);
    };

    const handleDelete = async (track) => {
        await removeTrack(track);
    };

    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des parcours</h1>
            <div>
                {/*<SearchBar />*/}
                <Button type="button" className={'green-btn'} onClick={handleCreate} >
                    + Ajouter un parcours
                </Button>
            </div>
            <section>
                <TrackTable onEdit={handleEdit} onDelete={handleDelete} />
            </section>
        </main>
    )
}

export default TracksDashboardPage;