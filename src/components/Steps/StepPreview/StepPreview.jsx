import React, {useState} from "react";
import classes from "./StepPreview.module.css";
import Button from "../../ui/Button/Button.jsx";
import DeletionModal from "../../ui/DeletionModal/DeletionModal.jsx";

function StepsPreview({ isFirstStep, isLastStep, step, trackId, onEdit, onReorder, onDelete }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <li key={step.id} className={classes["li-step-item"]}>
            <div className={classes["step-item"]}>
                <div className={classes["step-infos"]}>
                    <span className={classes["step-number"]}>{step.stepOrder}</span>
                    <p className={classes["step-title"]}>{step.name}</p>
                </div>
                <div className={classes["step-actions"]}>
                    <Button type='button'
                            className={'small-green-btn'}
                            onClick={() => onEdit(step)}
                    >
                        Modifier
                    </Button>
                    <Button type='submit'
                            className={'small-blue-btn'}
                            onClick={() => setModalOpen(true)}
                    >
                        Supprimer
                    </Button>
                    <DeletionModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={() => {
                            onDelete(trackId, step.id);
                            setModalOpen(false);
                        }}
                        itemName={step.name}
                    />
                </div>
            </div>
            <div className={classes["order-actions"]}>
                <Button className={'small-green-btn'}
                        onClick={() => onReorder(step.id, 'up')}
                        disabled={isFirstStep(step.stepOrder)}
                >▲
                </Button>
                <Button className={'small-green-btn'}
                        onClick={() => onReorder(step.id, 'down')}
                        disabled={isLastStep(step.stepOrder)}
                >▼
                </Button>
            </div>
        </li>
    );
}

export default StepsPreview;