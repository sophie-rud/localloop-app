import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useEffect, useState} from "react";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import { durationStringToMinutes, minutesToDurationString } from "../../../utils/duration.js";
import {useNavigate} from "react-router-dom";

function TrackForm({ selectedTrack, themes, onSubmit }) {

    const { setSelectedTrack, loading, error } = useTracksStore()
    const navigate = useNavigate();

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


    const submitHandler = async (e) => {
        e.preventDefault();

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

        onSubmit(formDataToSubmit);
    }

    const handleInputChange = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <form onSubmit={submitHandler} className={formClasses['track-form']}>
            {loading && <p>Chargement...</p>}
            {error && <p>Erreur {error}</p>}

            <label htmlFor="photo" className={formClasses['file-upload-btn']}>
                Photo de présentation
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

            <label htmlFor="presentation">Courte présentation du parcours</label>
            <textarea
                id="presentation"
                placeholder="Présenter votre parcours ici..."
                className={formClasses['common-textarea']}
                value={formData.presentation}
                onChange={handleInputChange('presentation')}
            />

            <label htmlFor="isPublished">Publier ce parcours</label>
            <input
                type="checkbox"
                id="isPublished"
                className={formClasses['common-checkbox']}
                checked={formData.isPublished}
                onChange={handleInputChange('isPublished')}
            />

            <Button type="submit" className={'blue-btn'} >
                Valider mon parcours
            </Button>
            <Button type="button"
                    onClick={() => {setSelectedTrack(null); navigate(-1)}}
                    className={'green-btn'}
            > Annuler
            </Button>
        </form>
    );
}

export default TrackForm;
