import formClasses from '../Forms.module.css';
import Button from '../../Button/Button.jsx';
import { useEffect, useState } from "react";
// import useUsersStore from "../../../stores/useUsersStore.jsx";

function PlaceForm() {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //
    //     const place = {
    //         name,
    //         city,
    //         description,
    //         photo,
    //         latitude,
    //         longitude,
    //     };
    //
    //     if(selectedPLace) {
    //         await editPLace({ ...selectedPLace, ...place });
    //     }
    //     else {
    //         await addPlace(place);
    //     }
    // }
    //
    // useEffect(() => {
    //     if (selectedPlace) {
    //         setName(selectedPlace.name || '');
    //         setCity(selectedPlace.city || '');
    //         setDescription(selectedPlace.description || '');
    //         setPhoto(selectedPlace.photo || '');
    //         setLatitude(selectedPlace.latitude || '');
    //         setLongitude(selectedPlace.longitude || '');
    //     }
    // }, [selectedPlace]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };


    return (
        < form className={formClasses['step-form']}>
            <h3>{place ? "Modifier le lieu" : "Nouveau lieu"}</h3>

            <label htmlFor="name">Nom du lieu</label>
            <input
                type="text"
                id="name"
                placeholder="Nom du lieu"
                className={formClasses['common-input']}
                value={name}
                onChange={handleInputChange(setName)}
            />

            <label htmlFor="city">Ville</label>
            <input
                type="text"
                id="city"
                placeholder="Ville"
                className={formClasses['common-input']}
                value={city}
                onChange={handleInputChange(setCity)}
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="Description"
                className={formClasses['common-textarea']}
                value={description}
                onChange={handleInputChange(setDescription)}
            />

            <label htmlFor="photo" className={formClasses['file-upload-btn']}>
                Photo
            </label>
            <input
                // type="file"
                type="text"
                id="photo"
                placeholder="Photo URL"
                className={formClasses['common-file-input']}
                value={photo}
                onChange={handleInputChange(setPhoto)}
            />

            <label htmlFor="latitude">Latitude</label>
            <input
                type="text"
                id="latitude"
                placeholder="Latitude"
                className={formClasses['common-input']}
                value={latitude}
                onChange={handleInputChange(setLatitude)}
            />

            <label htmlFor="longitude">Longitude</label>
            <input
                type="text"
                id="longitude"
                placeholder="Longitude"
                className={formClasses['common-input']}
                value={longitude}
                onChange={handleInputChange(setLongitude)}
            />

            <Button type="submit" className={'blue-btn'}>Enregistrer mon lieu</Button>

        </form>
    );
}

export default PlaceForm;
