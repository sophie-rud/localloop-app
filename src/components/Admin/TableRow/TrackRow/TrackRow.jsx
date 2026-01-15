import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../ui/Button/Button.jsx";
import {Pen, Trash2} from "lucide-react";
import DeletionModal from "../../../ui/DeletionModal/DeletionModal.jsx";
import {useState} from "react";

function TrackRow({ track, onEdit, onDelete }) {
    const [modalOpen, setModalOpen] = useState(false);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <tr>
            <td data-label="Photo"><img src={`${baseUrl}${track.photo}`} crossOrigin='anonymous' className={tableClasses['avatar']} alt={track.title}/>
            </td>
            <td data-label="title">{track.title}</td>
            <td data-label="duration"> {track.duration} </td>
            <td data-label="distance"> {track.distance} km</td>
            <td data-label="difficulty"> {track.difficulty} </td>
            <td data-label="author"> Lily </td>
            <td data-label="update"> {track.updatedAt} </td>
            <td data-label="edit">
                <Button type="submit" className={'small-blue-btn'} onClick={() => onEdit(track)} > <Pen /> </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="submit" className={'small-green-btn'} onClick={() => setModalOpen(true)} > <Trash2 /> </Button>
                <DeletionModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => {
                        onDelete(track.id);
                        setModalOpen(false);
                    }}
                    itemName={track.title}
                />
            </td>
        </tr>
    )
}

export default TrackRow;
