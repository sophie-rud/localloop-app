import TrackForm from "../../../components/Forms/TrackForm/TrackForm.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import useThemes from "../../../hooks/useThemes.jsx";
import StepsManager from "../../../components/Steps/StepsManager/StepsManager.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function CreateOrEditTrackPage({ isAdminPage = false }) {
    const { selectedTrack, setSelectedTrack, loadTrackById, addTrack, editTrack } = useTracksStore();
    const { themes, loading: themesLoading, error: themesError } = useThemes()
    const navigate = useNavigate();
    const { trackId } = useParams();
    const [isStepsManagerDisplayed, setIsStepsManagerDisplayed] = useState(true);

    useEffect(() => {
        loadTrackById(trackId);
    }, [trackId, loadTrackById]);

    const handleValidFormSubmit = async (data) => {
        let updatedTrack;

        if (selectedTrack) {
            await editTrack(selectedTrack.id, data);
            navigate(-1);
        } else {
            updatedTrack = await addTrack(data);
            setIsStepsManagerDisplayed(true);
            setSelectedTrack(updatedTrack);
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
                    onSubmitValidForm={handleValidFormSubmit}
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
