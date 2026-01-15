import TrackForm from "../../../components/Forms/TrackForm/TrackForm.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import useThemes from "../../../hooks/useThemes.jsx";
import StepsManager from "../../../components/Steps/StepsManager/StepsManager.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {patchRequest} from "../../../services/request.jsx";

function CreateOrEditTrackPage({ isAdminPage = false }) {
    const { selectedTrack, setSelectedTrack, loadUserTracks, loadTrackById, addTrack, editTrack } = useTracksStore();
    const { themes, loading: themesLoading, error: themesError } = useThemes()
    const navigate = useNavigate();
    const { trackId } = useParams();
    const [isStepsManagerDisplayed, setIsStepsManagerDisplayed] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadTrackById(trackId);
    }, [trackId, loadTrackById]);

    const handleValidFormSubmit = async (formData) => {
        if (selectedTrack) {
            const data = await editTrack(selectedTrack.id, formData);
            setMessage(data.message);
            setTimeout(() => {
                loadUserTracks();
                navigate(-1);
            }, 1500);
        } else {
            const data = await addTrack(formData);
            setSelectedTrack(data);
            setIsStepsManagerDisplayed(true);
            setMessage('Parcours créé avec succès !');
            setTimeout(() => {
                setMessage(null);
            }, 1500);
        }
    };

    // Publish / unpublish track
    async function handlePublish() {
        await patchRequest(`/tracks/${selectedTrack.id}/publish`);
        loadTrackById(trackId)
    }

    async function handleUnpublish() {
        await patchRequest(`/tracks/${selectedTrack.id}/unpublish`);
        loadTrackById();
    }

    if (themesLoading) return <p>Chargement des thèmes...</p>;
    if (themesError) return <p>Erreur lors du chargement des thèmes : {themesError}</p>;


    return (
        <main className={isAdminPage ? adminClasses['main-admin'] : "" }>
            <h1>{selectedTrack ? "Modifier un parcours" : "Créer un parcours"}</h1>
            {message && (<p className="success">{message}</p>)}
            <section>
                <TrackForm
                    themes={themes}
                    onSubmitValidForm={handleValidFormSubmit}
                    selectedTrack={selectedTrack}
                />
            </section>
            <section>
                {isStepsManagerDisplayed && selectedTrack?.id && (
                    <StepsManager
                        onPublish={handlePublish}
                        onUnpublish={handleUnpublish}
                    />
                )}
            </section>
        </main>
    )
}

export default CreateOrEditTrackPage;
