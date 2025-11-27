import StepsPreviewList from "../../StepPreviewList/StepsPreviewList.jsx";
import {useEffect, useState} from "react";
import StepModal from "../StepModal/StepModal.jsx";
import Button from "../../Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useTrackDetails from "../../../hooks/useTrackDetails.jsx";

function StepsManager({ trackId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState(null);
    // const [steps, setSteps] = useState([]);
    const { loadStepsForTrack, addStep, editStep } = useTracksStore();

    // useEffect(() => {
    //     if (!trackId) return;
    //     const fetchSteps = async () => {
    //         const trackSteps = await loadStepsForTrack(trackId);
    //         setSteps(trackSteps || []);
    //     };
    //     fetchSteps();
    // }, [trackId]);

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
        <div>
            <Button type="button" onClick={() => openAddModal()} className={'green-btn'}>+ Ajouter une étape</Button>

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