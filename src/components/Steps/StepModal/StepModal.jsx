import StepForm from "../../Forms/StepForm/StepForm.jsx";
import classes from "../../ui/CommonModal/CommonModal.module.css"

function StepModal({ isOpen, onClose, step, trackId, onStepSave }) {
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
                    onSubmit={handleSave}
                    onClose={onClose}
                />
            </div>
        </section>
    )
}

export default StepModal;
