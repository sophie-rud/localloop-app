import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../Button/Button.jsx";
import {Pen, Trash2} from "lucide-react";

function TrackRow({ track, onEdit, onDelete }) {
    return (
        <tr>
            <td data-label="Photo"><img src={track.photo} className={tableClasses['avatar']} alt={track.title}/>
            </td>
            <td data-label="title">{track.title}</td>
            <td data-label="duration"> {track.duration} </td>
            <td data-label="distance"> {track.distance} km</td>
            <td data-label="difficulty"> {track.difficulty} </td>
            <td data-label="author"> Lily </td>
            <td data-label="update"> {track.updated_at} </td>
            <td data-label="edit">
                <Button type="submit" className={'blue-btn'} onClick={() => onEdit(track)} > <Pen /> </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="submit" className={'green-btn'} onClick={() => onDelete(track.id)} > <Trash2 /> </Button>
            </td>
        </tr>
    )
}

export default TrackRow;
