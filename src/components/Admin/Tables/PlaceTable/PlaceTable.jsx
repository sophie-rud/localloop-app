import PlaceTableRow from "../../TableRow/PlaceTableRow/PlaceTableRow.jsx";

function PlaceTable() {
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
                <PlaceTableRow></PlaceTableRow>
                <PlaceTableRow></PlaceTableRow>
            </tbody>
        </table>
    )
}

export default PlaceTable;