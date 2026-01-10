import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useEffect, useState} from "react";
import usePlacesStore from "../../../stores/usePlacesStore.jsx";

function StepForm({ step, onClose, onSubmit }) {
    const { places, getPlaces } = usePlacesStore();

    useEffect(() => {
        getPlaces();
    }, [getPlaces]);

    const [formData, setFormData] = useState({
        photo: null,
        placeId: step?.placeId?.toString() ?? '',
        name: step?.name || '',
        stepOrder: step?.stepOrder?.toString() ?? '',
        anecdote: step?.anecdote || '',
        advice: step?.advice || '',
    });

    const handleInputChange = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();

        formDataToSubmit.append('placeId', String(formData.placeId));
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('stepOrder', String(formData.stepOrder));
        formDataToSubmit.append('anecdote', formData.anecdote);
        formDataToSubmit.append('advice', formData.advice);

        // Add photo if a new one has been selected
        if (formData.photo) {
            formDataToSubmit.append('photo', formData.photo);
        }

        onSubmit(formDataToSubmit);
    }

    return (
        <div className={formClasses['step-form']}>
            <h3>{step ? "Modifier l’étape" : "Nouvelle étape"}</h3>

            <form onSubmit={submitHandler} >
                <label htmlFor="placeId">Lieu</label>
                <select id="placeId"
                        className={formClasses['common-select-input']}
                        value = {formData.placeId}
                        onChange={handleInputChange('placeId')}
                        >
                    <option value="">Sélectionner un lieu</option>
                    {places.map(place => (
                        <option key={place.id} value={place.id?.toString()}>
                            {place.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="photo" className={formClasses['file-upload-btn']}>
                    Photo de l'étape
                </label>
                <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    className={formClasses['common-file-input']}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setFormData(prev => ({ ...prev, photo: file }));
                        }
                    }}
                />

                <label htmlFor="name">Titre de l'étape</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Nom de l'étape"
                    className={formClasses['common-input']}
                    value={formData.name}
                    onChange={handleInputChange('name')}
                />

                <label htmlFor="stepOrder">Ordre de l'étape</label>
                <input
                    type="int"
                    id="stepOrder"
                    placeholder="Ordre de l'étape"
                    className={formClasses['common-input']}
                    value={formData.stepOrder}
                    onChange={handleInputChange('stepOrder')}
                />

                <label htmlFor="anecdote">Anecdote</label>
                <textarea
                    id="anecdote"
                    placeholder="Anecdote"
                    className={formClasses['common-textarea']}
                    value={formData.anecdote}
                    onChange={handleInputChange('anecdote')}
                />

                <label htmlFor="advice">Conseil</label>
                <textarea
                    id="advice"
                    placeholder="Conseil"
                    className={formClasses['common-textarea']}
                    value={formData.advice}
                    onChange={handleInputChange('advice')}
                />

                <Button type="submit" className={'small-blue-btn'} >Enregistrer mon étape</Button>
                <Button type="button" className={'small-green-btn'} onClick={onClose}>Annuler</Button>
            </form>
        </div>
    );
}

export default StepForm;
