import React from "react";
import classes from "./StepsPreviewList.module.css";
import Button from "../../ui/Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";

function StepsPreviewList({ steps, trackId, onEdit, onReorder }) {

    const { removeStep } = useTracksStore();

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
                    >Modifier
                    </Button>
                    <Button type='submit'
                            className={'small-blue-btn'}
                            onClick={() => removeStep(trackId, step.id)}
                    >Supprimer
                    </Button>
                </div>
            </li>
        ))}
    </ul>
    );
}

export default StepsPreviewList;