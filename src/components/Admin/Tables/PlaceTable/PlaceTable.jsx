import PlaceRow from "../../TableRow/PlaceRow/PlaceRow.jsx";

function PlaceTable({ places, onEdit, onDelete }) {
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