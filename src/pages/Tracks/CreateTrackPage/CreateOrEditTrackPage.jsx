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

    const handleSubmit = async (data) => {
        let updatedTrack;

        if (selectedTrack) {
            updatedTrack = await editTrack(selectedTrack.id, data);
        } else {
            updatedTrack = await addTrack(data);
            setIsStepsManagerDisplayed(true);
        }

        setSelectedTrack(updatedTrack);
        navigate(-1);
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
