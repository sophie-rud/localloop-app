import photo from "../../../../assets/images/image-colmar.jpg";
import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../Button/Button.jsx";
import {Ban, Pen, Trash2} from "lucide-react";

function UserRow({ user, onEdit, onDelete, onBlock }) {
    return (
        <tr key={user.id}>
            <td data-label="Photo"><img src={photo} className={tableClasses['avatar']} alt="photo profil"/>
            </td>
            <td data-label="Username">{user.username}</td>
            <td data-label="Email">{user.email}</td>
            <td data-label="Rôle">{user.role}</td>
            <td>{user.isActive ? "Actif" : "Bloqué"}</td>
            <td data-label="Editer">
                <Button type="button" className={'blue-btn'} onClick={() => onEdit(user)} >  <Pen /> </Button>
            </td>
            <td data-label="Bloquer">
                <Button type="submit" className={'blue-btn'} onClick={() => onBlock(user)} > {user.isActive ? "Bloquer" : <Ban /> } </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="submit" className={'green-btn'} onClick={() => onDelete(user.id)} > <Trash2 /> </Button>
            </td>
        </tr>
    )
}

export default UserRow;
