import React from "react";
import classes from "./StepsPreviewList.module.css";
import StepPreview from "../StepPreview/StepPreview.jsx";

function StepsPreviewList({ steps, trackId, onEdit, onReorder, onDelete }) {

    const isFirstStep = (stepOrder) => stepOrder === 1;
    const isLastStep = (stepOrder) => stepOrder === steps?.length;

return (
    <ul className={classes["steps-preview-list"]}>
        {steps && steps.map(step =>
            <StepPreview
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                step={step}
                trackId={trackId}
                key={step.id}
                onEdit={onEdit}
                onReorder={onReorder}
                onDelete={onDelete}
            />
        )}
    </ul>
    );
}

export default StepsPreviewList;