import TrackForm from "../../../components/Forms/TrackForm/TrackForm.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";

function CreateOrEditTrackPage() {
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
        <main>
            <h1>Créer un parcours</h1>
            <TrackForm
                onSubmit={handleSubmit}
            ></TrackForm>
        </main>
    )
}

export default CreateOrEditTrackPage;
