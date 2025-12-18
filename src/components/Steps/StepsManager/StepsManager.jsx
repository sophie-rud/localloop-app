import StepsPreviewList from "../StepPreviewList/StepsPreviewList.jsx";
import {useState} from "react";
import StepModal from "../StepModal/StepModal.jsx";
import Button from "../../ui/Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import classes from "./StepsManager.module.css"
import usePlaces from "../../../hooks/usePlaces.jsx";

function StepsManager({ trackId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState(null);
    const { steps, loadStepsForTrack, addStep, editStep, loading, error } = useTracksStore();
    const { places, loading: loadingPlaces, error: errorPlaces } = usePlaces();

    if (loading || loadingPlaces) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (errorPlaces) return <p>Erreur de chargement des lieux : {error}</p>;

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
            await editStep(trackId, { ...stepToEdit, ...data });
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

            <h2>Étapes du parcours</h2>
            {(!steps.length) && <p>Ajoutez des étapes !</p>}

            <StepsPreviewList
                steps={steps}
                onEdit={(step) => openEditModal(step)}
            />

             <StepModal
                isOpen={isModalOpen}
                trackId={trackId}
                step={stepToEdit}
                places={places}
                onStepSave={handleStepSave}
                onClose={closeModal}
            />
        </div>
    );
}

export default StepsManager;