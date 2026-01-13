import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useEffect, useState} from "react";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import { durationStringToMinutes, minutesToDurationString } from "../../../utils/duration.js";
import {useNavigate} from "react-router-dom";
import { validators, validateForm, hasErrors } from '../../../utils/validators.js';

function TrackForm({ selectedTrack, themes, onSubmitValidForm }) {
    const { setSelectedTrack, loading, error } = useTracksStore()
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        photo: null,
        title: '',
        themeId: '',
        distance: '',
        duration: '',
        difficulty: '',
        presentation: '',
        isPublished: false,
    });

    useEffect(() => {
        if (selectedTrack) {
            setFormData({
                photo: null,
                title: selectedTrack.title || '',
                themeId: selectedTrack.themeId?.toString() ?? '',
                distance: selectedTrack.distance || '',
                duration: minutesToDurationString(selectedTrack.duration) || '',
                difficulty: selectedTrack.difficulty || '',
                presentation: selectedTrack.presentation || '',
                isPublished: selectedTrack.isPublished || false,
            });
        }
    }, [selectedTrack]);

    const isEditMode = Boolean(selectedTrack);

    const validationRules = {
        title: validators.title,
        distance: validators.distance,
        duration: validators.durationString,
        difficulty: validators.difficulty,
        presentation: validators.presentation,
        themeId: validators.themeId,
        ...(isEditMode ? {} : { photo: validators.photo })
    };

    const handleInputChange = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
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

        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('themeId', String(formData.themeId));
        formDataToSubmit.append('distance', formData.distance);
        formDataToSubmit.append('duration', durationStringToMinutes(formData.duration));
        formDataToSubmit.append('difficulty', formData.difficulty);
        formDataToSubmit.append('presentation', formData.presentation);
        formDataToSubmit.append('isPublished', String(formData.isPublished));

        // Add photo if a new one has been selected
        if (formData.photo) {
            formDataToSubmit.append('photo', formData.photo);
        }

        onSubmitValidForm(formDataToSubmit);
    }


    return (
        <form onSubmit={submitHandler} className={formClasses['track-form']}>
            {loading && <p>Chargement...</p>}
            {error && <p>Erreur {error}</p>}

            <div className={formClasses['input-container']}>
                {errors.photo && <p className="error">{errors.photo}</p>}
                <label htmlFor="photo" className={formClasses['file-upload-btn']}>
                    Photo de présentation (5Mo maximum, .jpg, .jpeg, .png)
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
                {errors.title && <p className="error">{errors.title}</p>}
                <label htmlFor="titleTrack">Titre du parcours</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Titre"
                    className={formClasses['common-input']}
                    value = {formData.title}
                    onChange={handleInputChange('title')}
                    required
                />
            </div>

            <div className={formClasses['input-container']}>
                {errors.themeId && <p className="error">{errors.themeId}</p>}
                <label htmlFor="themeId">Thème</label>
                <select
                    id="theme"
                    className={formClasses['common-select-input']}
                    value = {formData.themeId}
                    onChange={handleInputChange('themeId')}
                    required
                >
                    <option value="">Sélectionner un thème</option>
                    {themes.map(theme => (
                        <option key={theme.id} value={theme.id?.toString()}>
                            {theme.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={formClasses['input-container']}>
                {errors.distance && <p className="error">{errors.distance}</p>}
                <label htmlFor="distance">Distance (km)</label>
                <input
                    type="number"
                    id="distance"
                    placeholder="Distance"
                    className={formClasses['common-input']}
                    value = {formData.distance}
                    onChange={handleInputChange('distance')}
                    required
                />
            </div>

            <div className={formClasses['input-container']}>
                {errors.duration && <p className="error">{errors.duration}</p>}
                <label htmlFor="duration">Durée estimée</label>
                <input
                    type="text"
                    id="duration"
                    placeholder="Ex: 1:30"
                    className={formClasses['common-input']}
                    value = {formData.duration}
                    onChange={handleInputChange('duration')}
                    required
                />
            </div>

            <div className={formClasses['input-container']}>
                {errors.difficulty && <p className="error">{errors.difficulty}</p>}
                <label htmlFor="difficulty">Difficulté</label>
                <select
                    id="difficulty"
                    className={formClasses['common-select-input']}
                    value = {formData.difficulty}
                    onChange={handleInputChange('difficulty')}
                    required
                >
                    <option value="">Sélectionner un niveau de difficulté</option>
                    <option value="FACILE">Facile</option>
                    <option value="MOYEN">Moyen</option>
                    <option value="DIFFICILE">Difficile</option>
                    <option value="SPORTIF">Sportif</option>
                </select>
            </div>

            <div className={formClasses['input-container']}>
                {errors.presentation && <p className="error">{errors.presentation}</p>}
                <label htmlFor="presentation">Courte présentation du parcours</label>
                <textarea
                    id="presentation"
                    placeholder="Présenter votre parcours ici..."
                    className={formClasses['common-textarea']}
                    value={formData.presentation}
                    onChange={handleInputChange('presentation')}
                />
            </div>

            <div>
                <label htmlFor="isPublished">Publier ce parcours</label>
                <input
                    type="checkbox"
                    id="isPublished"
                    className={formClasses['common-checkbox']}
                    checked={formData.isPublished}
                    onChange={handleInputChange('isPublished')}
                />
            </div>

            <Button type="submit" className={'blue-btn'} >
                Valider mon parcours
            </Button>
            <Button type="button"
                    onClick={() => {setSelectedTrack(null); navigate(-1)}}
                    className={'green-btn'}
            >
                Retour
            </Button>
        </form>
    );
}

export default TrackForm;
