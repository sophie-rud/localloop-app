import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../ui/Button/Button.jsx";
import {Pen, Trash2} from "lucide-react";

function PlaceRow({ place, onEdit, onDelete }) {
    return (
        <tr>
            <td data-label="Photo"><img src={place.photo} className={tableClasses['avatar']} alt={place.name} />
            </td>
            <td data-label="name">{place.name}</td>
            <td data-label="city">{place.city}</td>
            <td data-label="department">{place.department_id}</td>
            <td data-label="latitude">{place.latitude}</td>
            <td data-label="longitude">{place.longitude}</td>
            <td data-label="author">Jean</td>
            <td data-label="edit">
                <Button type="submit" className={'small-blue-btn'} onClick={() => onEdit(place)} > <Pen /> </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="submit" className={'small-green-btn'} onClick={() => onDelete(place.id)} > <Trash2 /> </Button>
            </td>
        </tr>
    )
}

export default PlaceRow;
