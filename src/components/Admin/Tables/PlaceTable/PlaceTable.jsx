import PlaceRow from "../../TableRow/PlaceRow/PlaceRow.jsx";
import {useEffect} from "react";
import usePlacesStore from "../../../../stores/usePlacesStore.jsx";

function PlaceTable({ onEdit, onDelete }) {
    const { places, getPlaces } = usePlacesStore();

    useEffect(() => {
        getPlaces();
    }, [getPlaces]);

    return (
        <table>
            <thead>
            <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Ville</th>
                <th>Département</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Auteur</th>
                <th>Editer</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {places.map((place) => (
                <PlaceRow
                    key={place.id}
                    place={place}
                    onEdit={onEdit}
                    onDelete={onDelete}
                ></PlaceRow>
            ))}
            </tbody>
        </table>
    )
}

export default PlaceTable;