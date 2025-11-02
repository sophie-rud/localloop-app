import formClasses from '../Forms.module.css';
import Button from '../../Button/Button.jsx';
import classes from "./TrackForm.module.css";
import StepPreview from "../../StepPreviewList/StepsPreviewList.jsx";
import StepsPreviewList from "../../StepPreviewList/StepsPreviewList.jsx";

function TrackForm() {
    const steps = [
        { id: 1, title: "Place des Dominicains" },
        { id: 2, title: "Marché couvert" },
        { id: 3, title: "Quai de la Poissonnerie" },
    ];

    return (
        <form className={formClasses['track-form']}>

            <label htmlFor="photoTrack" className={formClasses['file-upload-btn']}>
                Photo
            </label>
            <input
                type="file"
                id="photoTrack"
                placeholder="photo"
                className={formClasses['common-file-input']}
            />

            <label htmlFor="titleTrack">Titre du parcours</label>
            <input
                type="text"
                id="titleTrack"
                placeholder="Titre"
                className={formClasses['common-input']}
            />

            <label htmlFor="distance">Distance</label>
            <input
                type="text"
                id="distance"
                placeholder="Distance"
                className={formClasses['common-input']}
            />

            <label htmlFor="duration">Durée estimée</label>
            <input
                type="text"
                id="duration"
                placeholder="Durée"
                className={formClasses['common-input']}
            />

            <label htmlFor="difficultyId">Difficulté</label>
            <select
                id="placeId"
                className={formClasses['common-select-input']}
            >
                <option value="">Sélectionner un lieu</option>
                <option value="1">Facile</option>
                <option value="2">Moyenne</option>
                <option value="3">Difficile</option>
            </select>

            <label htmlFor="presentation">Courte présentation du parcours</label>
            <textarea
                id="presentation"
                placeholder="Presentation"
                className={formClasses['common-textarea']}
            />

            <label htmlFor="isPublished">Publier ce parcours</label>
            <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                className={formClasses['common-checkbox']}
                checked/>

            <section className={classes["steps-section"]}>
                <h3 className={classes['steps-title']}>Étapes du parcours</h3>
                <StepsPreviewList steps={steps} />

                <Button type="button" className={'green-btn'}>+ Ajouter une étape</Button>
            </section>

            <Button type="submit" className={'blue-btn'}>Valider mon parcours</Button>
        </form>
    );
}

export default TrackForm;
