import StepForm from "../../Forms/StepForm/StepForm.jsx";
import classes from "../../ui/CommonModal/CommonModal.module.css"

function StepModal({ isOpen, onClose, step, trackId, onSave }) {
    if (!isOpen) return null;

    const handleSave = (updatedStep) => {
        onSave(updatedStep);
        onClose();
    };

    return (
        <section className={classes['modal']}>
            <div className={classes['modal-content']}>
                <StepForm
                    step={step}
                    trackId={trackId}
                    onSave={handleSave}
                    onCancel={onClose}
                ></StepForm>
            </div>
        </section>
    )
}

export default StepModal;
