import StepsPreviewList from "../StepPreviewList/StepsPreviewList.jsx";
import {useEffect, useState} from "react";
import StepModal from "../StepModal/StepModal.jsx";
import Button from "../../ui/Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import classes from "./StepsManager.module.css"

function StepsManager({ onPublish, onUnpublish }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState(null);
    const { selectedTrack: track, addStep, editStep, loadStepsForTrack, reorderStep, removeStep, loading, error } = useTracksStore();

    useEffect(() => {
        if (track?.id) {
            loadStepsForTrack(track.id);
        }
    }, [loadStepsForTrack, track?.id]);

    const steps = track?.steps || [];

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    const openAddModal = () => {
        setStepToEdit(null);
        setIsModalOpen(true);
    };

    const openEditModal = (step) => {
        setStepToEdit(step);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setStepToEdit(null);
    };

    const handleStepSave = async (data) => {
        if (stepToEdit) {
            await editStep(track.id, stepToEdit.id, data);
        } else {
            await addStep(track.id, data);
        }
        closeModal();
        loadStepsForTrack(track.id);
    };

    const handleReorder = async (stepId, direction) => {
        try {
            await reorderStep(track.id, stepId, direction);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };
    const handleDelete = async (trackId, stepId) => {
        await removeStep(trackId, stepId);
        loadStepsForTrack(track.id);
    };


    return (
        <div className={classes['steps-manager']}>
            <div>
                {steps?.length >= 3 && !track.isPublished && (
                    <Button onClick={onPublish} className={'small-blue-btn'}>
                        Publier le parcours
                    </Button>
                )}

                {track.isPublished && (
                    <Button onClick={onUnpublish} className={'small-blue-btn'}>
                        Rendre privé
                    </Button>
                )}

                {steps?.length < 3 && (
                    <p>Ajoutez au moins 3 étapes pour pouvoir publier ce parcours.</p>
                )}
            </div>

            <Button type="button" onClick={() => openAddModal()} className={'small-green-btn'}>+ Ajouter une étape</Button>

            <h2>Étapes du parcours</h2>
            {(!steps?.length) && <p>Ajoutez des étapes !</p>}

            <StepsPreviewList
                steps={steps}
                trackId={track.id}
                onEdit={(step) => openEditModal(step)}
                onReorder={handleReorder}
                onDelete={handleDelete}
            />

             <StepModal
                isOpen={isModalOpen}
                step={stepToEdit}
                onStepSave={handleStepSave}
                onClose={closeModal}
            />
        </div>
    );
}

export default StepsManager;
