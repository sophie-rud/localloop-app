import StepForm from "../../Forms/StepForm/StepForm.jsx";
import classes from "../../ui/CommonModal/CommonModal.module.css"

function StepModal({ isOpen, onClose, step, places, trackId, onStepSave }) {
    if (!isOpen) return null;

    const handleSave = (stepData) => {
        const step = { ...stepData, trackId };
        onStepSave(step);
        onClose();
    };

    return (
        <section className={classes['modal']}>
            <div className={classes['modal-content']}>
                <StepForm
                    step={step}
                    places={places}
                    onSubmit={handleSave}
                    onClose={onClose}
                />
            </div>
        </section>
    )
}

export default StepModal;
