import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useEffect, useState} from "react";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import { durationStringToMinutes, minutesToDurationString } from "../../../utils/duration.js";
import {useNavigate} from "react-router-dom";

function TrackForm({ selectedTrack, themes, onSubmit }) {

    const { setSelectedTrack, loading, error } = useTracksStore()
    const navigate = useNavigate();

    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const [themeId, setThemeId] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [presentation, setPresentation] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    useEffect(() => {
        if (selectedTrack) {
            setPhoto(selectedTrack.photo || "");
            setTitle(selectedTrack.title || "");
            setThemeId(selectedTrack.themeId?.toString() ?? "");
            setDistance(selectedTrack.distance || "");
            setDuration(minutesToDurationString(selectedTrack.duration) || "");
            setDifficulty(selectedTrack.difficulty || "");
            setPresentation(selectedTrack.presentation || "");
            setIsPublished(selectedTrack.isPublished || false);
        }
    }, [selectedTrack]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const track = {
            photo,
            title,
            themeId: parseInt(themeId),
            distance,
            duration: durationStringToMinutes(duration),
            difficulty,
            presentation,
            isPublished: Boolean(isPublished),
        };
        onSubmit(track)
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <form onSubmit={submitHandler} className={formClasses['track-form']}>
            {loading && <p>Chargement...</p>}
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
                value = {themeId}
                onChange={handleInputChange(setThemeId)}
            >
                <option value="">Sélectionner un thème</option>
                {themes.map(theme => (
                    <option key={theme.id} value={theme.id?.toString()}>
                        {theme.name}
                    </option>
                ))}
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
                <option value="FACILE">Facile</option>
                <option value="MOYEN">Moyen</option>
                <option value="DIFFICILE">Difficile</option>
                <option value="SPORTIF">Sportif</option>
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

            <Button type="submit"
                className={'blue-btn'}
            >
                Valider mon parcours
            </Button>
            <Button type="button"
                onClick={() => {
                setSelectedTrack(null);
                navigate(-1)
            }} className={'green-btn'}>
                Annuler
            </Button>
        </form>
    );
}

export default TrackForm;
