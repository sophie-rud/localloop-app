import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useEffect, useState} from "react";

function StepForm({ step, places, onClose, onSubmit }) {

    const [placeId, setPlaceId] = useState('');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [stepOrder, setStepOrder] = useState('');
    const [anecdote, setAnecdote] = useState('');
    const [advice, setAdvice] = useState('');

    useEffect(() => {
        if (step) {
            setPlaceId(step.placeId?.toString() ?? "");
            setPhoto(step.photo || "");
            setName(step.name || "");
            setStepOrder(step.stepOrder?.toString() ?? "");
            setAnecdote(step.anecdote || "");
            setAdvice(step.advice || "");
        }
    }, [step]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

        const submitHandler = (e) => {
            e.preventDefault();
            const step = {
                placeId: parseInt(placeId),
                photo: photo,
                name,
                stepOrder: parseInt(stepOrder),
                anecdote,
                advice,
            };
            onSubmit(step)
        };

    return (
        <div className={formClasses['step-form']}>
            <h3>{step ? "Modifier l’étape" : "Nouvelle étape"}</h3>

            <form onSubmit={submitHandler} >
                <label htmlFor="placeId">Lieu</label>
                <select id="placeId"
                        className={formClasses['common-select-input']}
                        value = {placeId}
                        onChange={handleInputChange(setPlaceId)}
                        >
                    <option value="">Sélectionner un lieu</option>
                    {places.map(place => (
                        <option key={place.id} value={place.id?.toString()}>
                            {place.name}
                        </option>
                    ))}
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
                    value={photo}
                    onChange={handleInputChange(setPhoto)}
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

                <label htmlFor="stepOrder">Ordre de l'étape</label>
                <input
                    type="int"
                    id="stepOrder"
                    placeholder="Ordre de l'étape"
                    className={formClasses['common-input']}
                    value={stepOrder}
                    onChange={handleInputChange(setStepOrder)}
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

                <Button type="submit" className={'small-blue-btn'} >Enregistrer mon étape</Button>
                <Button type="button" className={'small-green-btn'} onClick={onClose}>Annuler</Button>
            </form>
        </div>
    );
}

export default StepForm;
