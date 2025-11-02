import React from "react";
import classes from "./StepsPreviewList.module.css";
import Button from "../Button/Button.jsx";

function StepsPreviewList({ steps }) {

return (
    <ul className={classes["steps-preview-list"]}>
        {steps.map((step, index) => (
            <li key={step.id || index} className={classes["li-step-item"]}>
                <div className={classes["step-item"]}>
                    <span className={classes["step-number"]}>{index + 1}</span>
                    <p className={classes["step-title"]}>{step.title}</p>
                    <div className={classes["order-actions"]}>
                        <Button className={classes["step-btn"]}>▲</Button>
                        <Button className={classes["step-btn"]}>▼</Button>
                    </div>
                </div>
                <div className={classes["step-actions"]}>
                    <Button type='button' className={'small-green-btn'}>Modifier</Button>
                    <Button type='submit' className={'small-blue-btn'}>Supprimer</Button>
                </div>
            </li>
        ))}
    </ul>
    );
}

export default StepsPreviewList;