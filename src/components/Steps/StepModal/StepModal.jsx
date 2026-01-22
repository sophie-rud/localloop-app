import StepForm from "../../Forms/StepForm/StepForm.jsx";
import classes from "../../ui/CommonModal/CommonModal.module.css"

function StepModal({ isOpen, onClose, step, onStepSave }) {
    if (!isOpen) return null;

    const handleSave = (formDataToSubmit) => {
        onStepSave(formDataToSubmit);
        onClose();
    };

    return (
        <section className={classes['modal']}>
            <div className={classes['modal-content']}>
                <StepForm
                    step={step}
                    onSubmitValidForm={handleSave}
                    onClose={onClose}
                />
            </div>
        </section>
    )
}

export default StepModal;
