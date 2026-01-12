import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import { useState } from "react";
import usePlacesStore from "../../../stores/usePlacesStore.jsx";
import {hasErrors, validateForm, validators} from "../../../utils/validators.js";

function PlaceForm({ onSubmit, onClose }) {
    const { selectedPlace } = usePlacesStore()
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        photo: null,
        name: selectedPlace?.name || '',
        city: selectedPlace?.city || '',
        description: selectedPlace?.description || '',
        departmentId: selectedPlace?.departmentId?.toString() ?? '',
        latitude: selectedPlace?.latitude || '',
        longitude: selectedPlace?.longitude || '',
    });

    const isEditMode = Boolean(selectedPlace);

    const validationRules = {
        name: validators.title,
        latitude: validators.latitude,
        longitude: validators.longitude,
        departmentId: validators.departmentId,
        ...(isEditMode ? {} : { photo: validators.photo })
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        setErrors({});
        const formErrors = validateForm(formData, validationRules);
        setErrors(formErrors);

        if(hasErrors(formErrors)) {
            return;
        }

        const formDataToSubmit = new FormData();

        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('city', formData.city);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('departmentId', String(formData.departmentId));
        formDataToSubmit.append('latitude', String(formData.latitude));
        formDataToSubmit.append('longitude', String(formData.longitude));

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

            <div className={formClasses['input-container']}>
                {errors.name && <p className="error">{errors.name}</p>}
                <label htmlFor="name">Nom du lieu</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Nom du lieu"
                    className={formClasses['common-input']}
                    value={formData.name}
                    onChange={handleInputChange('name')}
                />
            </div>

            <div className={formClasses['input-container']}>
                <label htmlFor="city">Ville</label>
                <input
                    type="text"
                    id="city"
                    placeholder="Ville"
                    className={formClasses['common-input']}
                    value={formData.city}
                    onChange={handleInputChange('city')}
                />
            </div>

            <div className={formClasses['input-container']}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Description"
                    className={formClasses['common-textarea']}
                    value={formData.description}
                    onChange={handleInputChange('description')}
                />
            </div>

            <div className={formClasses['input-container']}>
                {errors.photo && <p className="error">{errors.photo}</p>}
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
            </div>

            <div className={formClasses['input-container']}>
                {errors.departmentId && <p className="error">{errors.departmentId}</p>}
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
            </div>

            <div className={formClasses['input-container']}>
                {errors.latitude && <p className="error">{errors.latitude}</p>}
                <label htmlFor="latitude">Latitude</label>
                <input
                    type="text"
                    id="latitude"
                    placeholder="Latitude"
                    className={formClasses['common-input']}
                    value={formData.latitude}
                    onChange={handleInputChange('latitude')}
                />
            </div>

            <div className={formClasses['input-container']}>
                {errors.longitude && <p className="error">{errors.longitude}</p>}
                <label htmlFor="longitude">Longitude</label>
                <input
                    type="text"
                    id="longitude"
                    placeholder="Longitude"
                    className={formClasses['common-input']}
                    value={formData.longitude}
                    onChange={handleInputChange('longitude')}
                />
            </div>

            <Button type="submit" className={'blue-btn'}>Enregistrer mon lieu</Button>
            {onClose && <Button type="button" onClick={onClose} className={'green-btn'}>Annuler</Button>}
        </form>
    );
}

export default PlaceForm;
