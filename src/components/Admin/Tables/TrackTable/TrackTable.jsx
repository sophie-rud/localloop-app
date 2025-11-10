import TrackTableRow from "../../TableRow/TrackTableRow/TrackTableRow.jsx";

function TrackTable() {
    return (
        <table>
            <thead>
            <tr>
                <th>Photo</th>
                <th>Titre</th>
                <th>Durée</th>
                <th>Distance</th>
                <th>Difficulté</th>
                <th>Auteur</th>
                <th>Mis à jour</th>
                <th>Editer</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
                <TrackTableRow></TrackTableRow>
                <TrackTableRow></TrackTableRow>
            </tbody>
        </table>
    )
}

export default TrackTable;