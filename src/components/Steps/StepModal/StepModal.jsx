import StepForm from "../../Forms/StepForm/StepForm.jsx";
import classes from "../../ui/CommonModal/CommonModal.module.css"

function StepModal({ isOpen, onClose, step, onStepSave }) {
    if (!isOpen) return null;

    const handleSave = (stepData) => {
        onStepSave(stepData);
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
