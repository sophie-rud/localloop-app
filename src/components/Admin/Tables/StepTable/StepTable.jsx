import StepTableRow from "../../TableRow/StepTableRow/StepTableRow.jsx";

function StepTable() {
    return (
        <table>
            <thead>
            <tr>
                <th>Photo</th>
                <th>Nom</th>
                <th>Auteur</th>
                <th>Mise à jour</th>
                <th>Editer</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
                <StepTableRow></StepTableRow>
                <StepTableRow></StepTableRow>
            </tbody>
        </table>
    )
}

export default StepTable;