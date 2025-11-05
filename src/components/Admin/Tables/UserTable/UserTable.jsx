import UserTableRow from "../../TableRow/UserTableRow/UserTableRow.jsx";

function UserTable() {
    return (
        <table>
            <thead>
            <tr>
                <th>Photo</th>
                <th>Pseudo</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Bloquer</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
                <UserTableRow></UserTableRow>
                <UserTableRow></UserTableRow>
            </tbody>
        </table>
    )
}

export default UserTable;