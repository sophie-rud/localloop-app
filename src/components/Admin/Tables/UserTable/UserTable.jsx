import UserRow from "../../TableRow/UserRow/UserRow.jsx";
import useUsersStore from "../../../../stores/useUsersStore.jsx";
import {useEffect} from "react";

function UserTable({ onEdit, onDelete, onBlock }) {

    const {users, getUsers } = useUsersStore();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <table>
            <thead>
            <tr>
                <th>Photo</th>
                <th>Pseudo</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Etat</th>
                <th>Editer</th>
                <th>Bloquer</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <UserRow
                    key={user.id}
                    user={user}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onBlock={onBlock}
                ></UserRow>
            ))}
            </tbody>
        </table>
    )
}

export default UserTable;