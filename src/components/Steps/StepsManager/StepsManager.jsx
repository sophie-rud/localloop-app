import StepsPreviewList from "../StepPreviewList/StepsPreviewList.jsx";
import {useState} from "react";
import StepModal from "../StepModal/StepModal.jsx";
import Button from "../../ui/Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import classes from "./StepsManager.module.css"

function StepsManager() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState(null);
    const { selectedTrack, addStep, editStep, loading, error } = useTracksStore();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    const track = selectedTrack;
    const steps = track?.steps;

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
    };


    return (
        <div className={classes['steps-manager']}>
            <Button type="button" onClick={() => openAddModal()} className={'small-green-btn'}>+ Ajouter une étape</Button>

            <h2>Étapes du parcours</h2>
            {(!steps.length) && <p>Ajoutez des étapes !</p>}

            <StepsPreviewList
                steps={steps}
                onEdit={(step) => openEditModal(step)}
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