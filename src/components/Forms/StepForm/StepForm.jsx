import formClasses from '../Forms.module.css';
import Button from '../../Button/Button.jsx';
import {useEffect, useState} from "react";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useNavigate} from "react-router-dom";

function StepForm({ selectedStep }) {

    const addStep = useTracksStore((state) => state.addStep);
    const editStep = useTracksStore((state) => state.editStep);
    const navigate = useNavigate();

    const [photoStep, setPhotoStep] = useState('');
    const [titleStep, setTitleStep] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [description, setDescription] = useState('');
    const [advice, setAdvice] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        const step = {
            placeId,
            photoStep,
            titleStep,
            description,
            advice,
        };

        if(selectedStep) {
            await editStep({ ...selectedStep, ...step });
        }
        else {
            await addStep(step);
        }
        navigate(-1);
    }

    useEffect(() => {
        if (selectedStep) {
            setPlaceId(selectedStep.placeId);
            setPhotoStep(selectedStep.photo);
            setTitleStep(selectedStep.title);
            setDescription(selectedStep.description);
            setAdvice(selectedStep.advice);
        }
    }, [selectedStep]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <form onSubmit={submitHandler} className={formClasses['step-form']}>

            <label htmlFor="placeId">Lieu</label>
            <select id="placeId"
                    className={formClasses['common-select-input']}
                    value={placeId}
                    onChange={handleInputChange(setPlaceId)}
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
                type="file"
                id="photoStep"
                placeholder="photo"
                className={formClasses['common-file-input']}
                value={photoStep}
                onChange={handleInputChange(setPhotoStep)}
            />

            <label htmlFor="titleStep">Titre de l'étape</label>
            <input
                type="text"
                id="titleStep"
                placeholder="Titre"
                className={formClasses['common-input']}
                value={titleStep}
                onChange={handleInputChange(setTitleStep)}
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="Description"
                className={formClasses['common-textarea']}
                value={description}
                onChange={handleInputChange(setDescription)}
            />

            <label htmlFor="advice">Anecdote</label>
            <textarea
                id="advice"
                placeholder="Conseil"
                className={formClasses['common-textarea']}
                value={advice}
                onChange={handleInputChange(setAdvice)}
            />

            <Button type="submit" className={'blue-btn'}>Enregistrer mon étape</Button>
        </form>
    );
}

export default StepForm;
