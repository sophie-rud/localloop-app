import StepsPreviewList from "../StepPreviewList/StepsPreviewList.jsx";
import {useState} from "react";
import StepModal from "../StepModal/StepModal.jsx";
import Button from "../../ui/Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import classes from "./StepsManager.module.css"

function StepsManager({ trackId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState(null);
    const { steps, loadStepsForTrack, addStep, editStep, loading, error } = useTracksStore();

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;
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
            />

             <StepModal
                isOpen={isModalOpen}
                trackId={trackId}
                step={stepToEdit}
                onSave={handleSave}
                onClose={closeModal}
            />
        </div>
    );
}

export default StepsManager;