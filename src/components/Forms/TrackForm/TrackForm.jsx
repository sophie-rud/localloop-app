import formClasses from '../Forms.module.css';
import Button from '../../Button/Button.jsx';
import {useEffect, useState} from "react";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import StepsManager from "../../Steps/StepsManager/StepsManager.jsx";
import { durationStringToMinutes, minutesToDurationString } from "../../../utils/duration.js";
import {useNavigate} from "react-router-dom";

function TrackForm({ onSubmit }) {

    const { selectedTrack, loading, error } = useTracksStore()
    const navigate = useNavigate();

    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [presentation, setPresentation] = useState('');
    const [isPublished, setIsPublished] = useState('');

    useEffect(() => {
        if (selectedTrack) {
            setPhoto(selectedTrack.photo || "");
            setTitle(selectedTrack.title || "");
            setTheme(selectedTrack.theme || "");
            setDistance(selectedTrack.distance || "");
            setDuration(minutesToDurationString(selectedTrack.duration) || "");
            setDifficulty(selectedTrack.difficulty || "");
            setPresentation(selectedTrack.presentation || "");
            setIsPublished(selectedTrack.isPublished ?? true);
        }
    }, [selectedTrack]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const track = {
            photo,
            title,
            theme,
            distance,
            duration: durationStringToMinutes(duration),
            difficulty,
            presentation,
            isPublished
        };
        onSubmit(track)
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <form onSubmit={submitHandler} className={formClasses['track-form']}>
            {loading && <p>Enregistrement...</p>}
            {error && <p>Erreur {error}</p>}

            <label htmlFor="photoTrack" className={formClasses['file-upload-btn']}>
                Photo
            </label>
            <input
                // type="file"
                type="text"
                id="photoTrack"
                placeholder="Photo"
                className={formClasses['common-file-input']}
                value={photo}
                onChange={handleInputChange(setPhoto)}
            />

            <label htmlFor="titleTrack">Titre du parcours</label>
            <input
                type="text"
                id="titleTrack"
                placeholder="Titre"
                className={formClasses['common-input']}
                value = {title}
                onChange={handleInputChange(setTitle)}
            />

            <label htmlFor="theme">Thème</label>
            <select
                id="theme"
                className={formClasses['common-select-input']}
                value = {theme}
                onChange={handleInputChange(setTheme)}
            >
                <option value="">Sélectionner un thème</option>
                <option value="1">Nature</option>
                <option value="2">Urbain</option>
                <option value="3">Culture</option>
                <option value="4">Sport</option>
                <option value="5">Gastronomie</option>
                <option value="6">Histoire</option>
            </select>

            <label htmlFor="distance">Distance</label>
            <input
                type="text"
                id="distance"
                placeholder="Distance"
                className={formClasses['common-input']}
                value = {distance}
                onChange={handleInputChange(setDistance)}
            />

            <label htmlFor="duration">Durée estimée</label>
            <input
                type="text"
                id="duration"
                placeholder="ex: 1:30"
                className={formClasses['common-input']}
                value = {duration}
                onChange={handleInputChange(setDuration)}
            />

            <label htmlFor="difficulty">Difficulté</label>
            <select
                id="difficulty"
                className={formClasses['common-select-input']}
                value = {difficulty}
                onChange={handleInputChange(setDifficulty)}
            >
                <option value="">Sélectionner un niveau de difficulté</option>
                <option value="1">Facile</option>
                <option value="2">Moyenne</option>
                <option value="3">Difficile</option>
            </select>

            <label htmlFor="presentation">Courte présentation du parcours</label>
            <textarea
                id="presentation"
                placeholder="Presentation"
                className={formClasses['common-textarea']}
                value={presentation}
                onChange={handleInputChange(setPresentation)}
            />

            <label htmlFor="isPublished">Publier ce parcours</label>
            <input
                type="checkbox"
                id="isPublished"
                // name="isPublished"
                className={formClasses['common-checkbox']}
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
            />

            <StepsManager
                trackId={selectedTrack?.id}
            />

            <Button type="submit" className={'blue-btn'}>Valider mon parcours</Button>
            <Button type="button" onClick={() => navigate(-1)} className={'green-btn'}>Annuler</Button>
        </form>
    );
}

export default TrackForm;
