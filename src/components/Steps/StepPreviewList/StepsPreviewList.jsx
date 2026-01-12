import React, {useState} from "react";
import classes from "./StepsPreviewList.module.css";
import Button from "../../ui/Button/Button.jsx";
import DeletionModal from "../../ui/DeletionModal/DeletionModal.jsx";

function StepsPreviewList({ steps, trackId, onEdit, onReorder, onDelete }) {
    const [modalOpen, setModalOpen] = useState(false);

    const isFirstStep = (stepOrder) => stepOrder === 1;
    const isLastStep = (stepOrder) => stepOrder === steps.length;

return (
    <ul className={classes["steps-preview-list"]}>
        {steps.map((step) => (
            <li key={step.id} className={classes["li-step-item"]}>
                <div className={classes["step-item"]}>
                    <span className={classes["step-number"]}>{step.stepOrder}</span>
                    <p className={classes["step-title"]}>{step.name}</p>
                    <div className={classes["order-actions"]}>
                        <Button className={classes["step-btn"]}
                                onClick={() => onReorder(step.id, 'up')}
                                disabled={isFirstStep(step.stepOrder)}
                        >▲
                        </Button>
                        <Button className={classes["step-btn"]}
                                onClick={() => onReorder(step.id, 'down')}
                                disabled={isLastStep(step.stepOrder)}
                        >▼
                        </Button>
                    </div>
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
            </li>
        ))}
    </ul>
    );
}

export default StepsPreviewList;