import StepsPreviewList from "../StepPreviewList/StepsPreviewList.jsx";
import {useEffect, useState} from "react";
import StepModal from "../StepModal/StepModal.jsx";
import Button from "../../ui/Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import classes from "./StepsManager.module.css"

function StepsManager() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState(null);
    const { selectedTrack: track, addStep, editStep, loadStepsForTrack, getStepsForSelectedTrack, reorderStep, loading, error } = useTracksStore();

    useEffect(() => {
        if (track?.id) {
            loadStepsForTrack(track.id);
        }
    }, [loadStepsForTrack, track.id]);

    const steps = getStepsForSelectedTrack();

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
            await loadStepsForTrack(track.id);
        } else {
            await addStep(track.id, data);
        }
        closeModal();
    };

    const handleReorder = async (stepId, direction) => {
        try {
            await reorderStep(track.id, stepId, direction);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className={classes['steps-manager']}>
            <Button type="button" onClick={() => openAddModal()} className={'small-green-btn'}>+ Ajouter une étape</Button>

            <h2>Étapes du parcours</h2>
            {(!steps.length) && <p>Ajoutez des étapes !</p>}

            <StepsPreviewList
                steps={steps}
                trackId={track.id}
                onEdit={(step) => openEditModal(step)}
                onReorder={handleReorder}
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