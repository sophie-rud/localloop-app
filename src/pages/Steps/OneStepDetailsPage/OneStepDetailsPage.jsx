import StepPresentation from "../../../components/StepPresentation/StepPresentation.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useTracksStore from "../../../stores/useTracksStore.jsx";

function OneStepDetailsPage() {
    const { stepId } = useParams();
    const { selectedStep, loading, error, loadOneStep } = useTracksStore();
    const step = selectedStep;

    useEffect(() => {
        if (stepId) {
            loadOneStep(stepId);
        }
    }, [stepId, loadOneStep]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!step) return <p>Pas d'étape trouvée.</p>;

    return (
        <main>
            <StepPresentation step={step} />
        </main>
    )
}

export default OneStepDetailsPage;