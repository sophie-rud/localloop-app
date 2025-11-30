import photo from "../../../../assets/images/image-colmar.jpg";
import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../Button/Button.jsx";
import {Pen, Trash2} from "lucide-react";

function StepTableRow() {
    return (
        <tr>
            <td data-label="Photo"><img src={photo} className={tableClasses['avatar']} alt="photo profil"/>
            </td>
            <td data-label="name">Quai de la poissonnerie</td>
            <td data-label="author">Jean</td>
            <td data-label="update">10/11/2025</td>
            <td data-label="edit">
                <Button type="submit" className={'blue-btn'}> <Pen /> </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="submit" className={'green-btn'}> <Trash2 /> </Button>
            </td>
        </tr>
    )
}

export default StepTableRow;
