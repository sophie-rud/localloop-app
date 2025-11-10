import photo from "../../../../assets/images/image-colmar.jpg";
import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../Button/Button.jsx";
import {Pen, Trash2} from "lucide-react";

function PlaceTableRow() {
    return (
        <tr>
            <td data-label="Photo"><img src={photo} className={tableClasses['avatar']} alt="photo profil"/>
            </td>
            <td data-label="name">Quai de la poissonnerie</td>
            <td data-label="city">Colmar</td>
            <td data-label="department">68</td>
            <td data-label="latitude">48°04'27.2"N</td>
            <td data-label="longitude">7°21'35.1"E</td>
            <td data-label="author">Jean</td>
            <td data-label="edit">
                <Button type="submit" className={'blue-btn'}> <Pen /> </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="submit" className={'green-btn'}> <Trash2 /> </Button>
            </td>
        </tr>
    )
}

export default PlaceTableRow;
