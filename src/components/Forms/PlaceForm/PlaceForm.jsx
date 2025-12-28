import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import { useState } from "react";
import usePlacesStore from "../../../stores/usePlacesStore.jsx";

function PlaceForm({ onSubmit, onClose }) {
    const { selectedPlace } = usePlacesStore()

    const [formData, setFormData] = useState({
        photo: null,
        name: selectedPlace.name || '',
        city: selectedPlace.city || '',
        description: selectedPlace.description || '',
        departmentId: selectedPlace.departmentId?.toString() ?? '',
        latitude: selectedPlace.latitude || '',
        longitude: selectedPlace.longitude || '',
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();

        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('city', formData.city);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('departmentId', parseInt(formData.departmentId));
        formDataToSubmit.append('latitude', formData.latitude);
        formDataToSubmit.append('longitude', formData.longitude);

        // Add photo if a new one has been selected
        if (formData.photo) {
            formDataToSubmit.append('photo', formData.photo);
        }

        onSubmit(formDataToSubmit);
    }

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <form onSubmit={submitHandler} className={formClasses['step-form']}>
            <h3>{ selectedPlace ? "Modifier le lieu" : "Nouveau lieu"}</h3>

            <label htmlFor="name">Nom du lieu</label>
            <input
                type="text"
                id="name"
                placeholder="Nom du lieu"
                className={formClasses['common-input']}
                value={formData.name}
                onChange={handleInputChange('name')}
            />

            <label htmlFor="city">Ville</label>
            <input
                type="text"
                id="city"
                placeholder="Ville"
                className={formClasses['common-input']}
                value={formData.city}
                onChange={handleInputChange('city')}
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="Description"
                className={formClasses['common-textarea']}
                value={formData.description}
                onChange={handleInputChange('description')}
            />

            <label htmlFor="photo" className={formClasses['file-upload-btn']}>
                Photo
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

            <label htmlFor="departmentId">Rôle</label>
            <select
                id="departmentId"
                value={formData.departmentId}
                className={formClasses['common-select-input']}
                onChange={handleInputChange('departmentId')}
            >
                <option value="">Sélectionner un département</option>
                <option value="1">Bas-Rhin</option>
                <option value="2">Haut-Rhin</option>
            </select>

            <label htmlFor="latitude">Latitude</label>
            <input
                type="text"
                id="latitude"
                placeholder="Latitude"
                className={formClasses['common-input']}
                value={formData.latitude}
                onChange={handleInputChange('latitude')}
            />

            <label htmlFor="longitude">Longitude</label>
            <input
                type="text"
                id="longitude"
                placeholder="Longitude"
                className={formClasses['common-input']}
                value={formData.longitude}
                onChange={handleInputChange('longitude')}
            />

            <Button type="submit" className={'blue-btn'}>Enregistrer mon lieu</Button>
            {onClose && <Button type="button" onClick={onClose} className={'green-btn'}>Annuler</Button>}
        </form>
    );
}

export default PlaceForm;
