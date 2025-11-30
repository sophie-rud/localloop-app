import TrackForm from "../../../components/Forms/TrackForm/TrackForm.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";

function CreateOrEditTrackPage({ isAdminPage = false }) {
    const { selectedTrack, addTrack, editTrack } = useTracksStore();

    const handleSubmit = async (data) => {
        if(selectedTrack) {
            await editTrack({ ...selectedTrack, ...data });
        }
        else {
            await addTrack(data);
        }
    };

    return (
        <main className={isAdminPage ? adminClasses['main-admin'] : "" }>
            <h1>Créer un parcours</h1>
            <TrackForm
                onSubmit={handleSubmit}
            ></TrackForm>
        </main>
    )
}

export default CreateOrEditTrackPage;
