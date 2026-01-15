import tableClasses from "../../Tables/Tables.module.css";
import Button from "../../../ui/Button/Button.jsx";
import {Ban, Pen, Trash2} from "lucide-react";
import DeletionModal from "../../../ui/DeletionModal/DeletionModal.jsx";
import React, {useState} from "react";

function UserRow({ user, onEdit, onDelete, onBlock }) {
    const [modalOpen, setModalOpen] = useState(false);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <tr key={user.id}>
            <td data-label="Photo"><img src={`${baseUrl}${user.avatar}`} alt={user.username} crossOrigin='anonymous' className={tableClasses['avatar']} />
            </td>
            <td data-label="Username">{user.username}</td>
            <td data-label="Email">{user.email}</td>
            <td data-label="Role">{user.role}</td>
            <td>{user.isActive ? "Actif" : "Bloqué"}</td>
            <td data-label="Editer">
                <Button type="button" className={'small-blue-btn'} onClick={() => onEdit(user)} >  <Pen /> </Button>
            </td>
            <td data-label="Bloquer">
                <Button type="submit" className={'small-blue-btn'} onClick={() => onBlock(user)} > {user.isActive ? "Bloquer" : <Ban /> } </Button>
            </td>
            <td data-label="Supprimer">
                <Button type="button" className={'small-green-btn'} onClick={() => setModalOpen(true)} > <Trash2 /> </Button>
                <DeletionModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => {
                        onDelete(user.id);
                        setModalOpen(false);
                    }}
                    itemName={`le profil ${user.username}`}
                />
            </td>
        </tr>
    )
}

export default UserRow;
