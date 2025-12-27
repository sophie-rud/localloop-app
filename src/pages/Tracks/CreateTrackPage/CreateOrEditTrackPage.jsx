import TrackForm from "../../../components/Forms/TrackForm/TrackForm.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import useThemes from "../../../hooks/useThemes.jsx";
import StepsManager from "../../../components/Steps/StepsManager/StepsManager.jsx";
import { useState } from "react";

function CreateOrEditTrackPage({ isAdminPage = false }) {
    const { selectedTrack, setSelectedTrack, addTrack, editTrack } = useTracksStore();
    const { themes, loading: themesLoading, error: themesError } = useThemes()

    const [isStepsManagerDisplayed, setIsStepsManagerDisplayed] = useState(true);

    const handleSubmit = async (data) => {
        if(selectedTrack) {
            await editTrack(selectedTrack.id, { ...selectedTrack, ...data });
            // setIsStepsManagerDisplayed(true);
        }
        else {
            const newTrack = await addTrack(data);
            setSelectedTrack(newTrack);
            setIsStepsManagerDisplayed(true);
        }
    };

    if (themesLoading) return <p>Chargement des thèmes...</p>;
    if (themesError) return <p>Erreur lors du chargement des thèmes : {themesError}</p>;


    return (
        <main className={isAdminPage ? adminClasses['main-admin'] : "" }>
            <h1>{selectedTrack ? "Modifier un parcours" : "Créer un parcours"}</h1>
            <section>
                <TrackForm
                    themes={themes}
                    onSubmit={handleSubmit}
                    selectedTrack={selectedTrack}
                />
            </section>
            <section>
                {isStepsManagerDisplayed && selectedTrack?.id && (
                    <StepsManager />
                )}
            </section>
        </main>
    )
}

export default CreateOrEditTrackPage;
