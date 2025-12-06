import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function StepForm({ step, onCancel, onSave }) {
    const navigate = useNavigate();

    const [placeId, setPlaceId] = useState('');
    const [photoStep, setPhotoStep] = useState('');
    const [name, setName] = useState('');
    const [anecdote, setAnecdote] = useState('');
    const [advice, setAdvice] = useState('');

    useEffect(() => {
        if (step) {
            setPlaceId(step.place_id);
            setPhotoStep(step.photo);
            setName(step.name);
            setAnecdote(step.anecdote);
            setAdvice(step.advice);
        }
    }, [step]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSave = () => {
        const updatedStep = {
            ...step,
            name,
            photo: photoStep,
            anecdote,
            advice,
            place_id: placeId
        };

        onSave(updatedStep);
        navigate(-1);
    };

    return (
        <div className={formClasses['step-form']}>
            <h3>{step ? "Modifier l’étape" : "Nouvelle étape"}</h3>

            <label htmlFor="placeId">Lieu</label>
            <select id="placeId"
                    className={formClasses['common-select-input']}
                    >
                <option value="">Sélectionner un lieu</option>
                <option value="1">Place des Dominicains</option>
                <option value="2">Marché couvert</option>
                <option value="3">21 quai de la Poissonnerie</option>
            </select>

            <label htmlFor="photoStep" className={formClasses['file-upload-btn']}>
                Photo
            </label>
            <input
                // type="file"
                type="text"
                id="photoStep"
                placeholder="photo"
                className={formClasses['common-file-input']}
                value={photoStep}
                onChange={handleInputChange(setPhotoStep)}
            />

            <label htmlFor="name">Titre de l'étape</label>
            <input
                type="text"
                id="name"
                placeholder="Nom de l'étape"
                className={formClasses['common-input']}
                value={name}
                onChange={handleInputChange(setName)}
            />

            <label htmlFor="anecdote">Anecdote</label>
            <textarea
                id="anecdote"
                placeholder="Anecdote"
                className={formClasses['common-textarea']}
                value={anecdote}
                onChange={handleInputChange(setAnecdote)}
            />

            <label htmlFor="advice">Conseil</label>
            <textarea
                id="advice"
                placeholder="Conseil"
                className={formClasses['common-textarea']}
                value={advice}
                onChange={handleInputChange(setAdvice)}
            />

            <Button type="button" className={'small-blue-btn'} onClick={handleSave} >Enregistrer mon étape</Button>
            <Button type="button" className={'small-green-btn'} onClick={onCancel}>Annuler</Button>
        </div>
    );
}

export default StepForm;
