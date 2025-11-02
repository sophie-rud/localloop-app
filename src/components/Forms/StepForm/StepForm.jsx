import formClasses from '../Forms.module.css';
import Button from '../../Button/Button.jsx';

function StepForm() {

    return (
        <form className={formClasses['step-form']}>

            <label htmlFor="placeId">Lieu</label>
            <select id="placeId"
                    className={formClasses['common-select-input']}
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
            />

            <label htmlFor="titleStep">Titre de l'étape</label>
            <input
                type="text"
                id="titleStep"
                placeholder="Titre"
                className={formClasses['common-input']}
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="Description"
                className={formClasses['common-textarea']}
            />

            <label htmlFor="anecdote">Anecdote</label>
            <textarea
                id="anecdote"
                placeholder="Anecdote"
                className={formClasses['common-textarea']}
            />

            <Button type="submit" className={'blue-btn'}>Enregistrer mon étape</Button>
        </form>
    );
}

export default StepForm;
