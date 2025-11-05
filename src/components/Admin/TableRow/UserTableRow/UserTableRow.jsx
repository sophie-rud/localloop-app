import photo from "../../../../assets/images/image-colmar.jpg";
import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../Button/Button.jsx";
import {Ban, Trash2} from "lucide-react";

function UserTableRow() {
    return (
        <tr>
            <td data-label="Photo"><img src={photo} className={tableClasses['avatar']} alt="photo profil"/>
            </td>
            <td data-label="Username">Jean Dupont</td>
            <td data-label="Email">jean.dupont@mail.com</td>
            <td data-label="Rôle">Admin</td>
            <td data-label="Bloquer">
                <Button type="submit" className={'blue-btn'}> <Ban /> </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="submit" className={'green-btn'}> <Trash2 /> </Button>
            </td>
        </tr>
    )
}

export default UserTableRow;
