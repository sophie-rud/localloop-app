import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/Button/Button.jsx";
import SearchBar from "../../../layouts/elements/SearchBar/SearchBar.jsx";
import TrackTable from "../../../components/Admin/Tables/TrackTable/TrackTable.jsx";
import TrackRow from "../../../components/Admin/TableRow/TrackRow/TrackRow.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

function TracksDashboardPage() {

    const { setSelectedTrack, removeTrack} = useTracksStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate(`/admin/${id}/tracks/create`)
    }

    const handleEdit = (track) => {
        setSelectedTrack(track);
        navigate(`/admin/${id}/tracks/${track.id}/edit`);
    };

    const handleDelete = async (track) => {
        await removeTrack(track.id);
    };

    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des parcours</h1>
            <div>
                <SearchBar></SearchBar>
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