import StepsPreviewList from "../../StepPreviewList/StepsPreviewList.jsx";
import {useState} from "react";
import StepModal from "../StepModal/StepModal.jsx";
import Button from "../../Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useTrackDetails from "../../../hooks/useTrackDetails.jsx";
import classes from "./StepsManager.module.css"

function StepsManager({ trackId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState(null);
    const { loadStepsForTrack, addStep, editStep } = useTracksStore();

    const { steps, loading } = useTrackDetails(trackId);

    if (loading) return <p>Chargement...</p>;
    if (!steps) return <p>Aucune étape</p>;

    if (!steps.length) return <p>Aucune étape</p>;

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

    const handleSave = async (data) => {
        if (stepToEdit) {
            await editStep({ ...stepToEdit, ...data });
        } else {
            await addStep(trackId, data);
        }
        await loadStepsForTrack(trackId);
        setIsModalOpen(false);
        setStepToEdit(null);
    };


    return (
        <div className={classes['steps-manager']}>
            <Button type="button" onClick={() => openAddModal()} className={'small-green-btn'}>+ Ajouter une étape</Button>

            <h3>Étapes du parcours</h3>

            <StepsPreviewList
                steps={steps}
                onEdit={(step) => openEditModal(step)}
                // onDelete={stepId => removeStep(stepId)}
            />

             <StepModal
                isOpen={isModalOpen}
                trackId={trackId}
                step={stepToEdit}
                onSave={handleSave}
                onClose={closeModal}
                // places={places}
            />
        </div>
    );
}

export default StepsManager;