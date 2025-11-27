import { useState, useEffect } from "react";
import formClasses from '../Forms.module.css';
import Button from "../../Button/Button.jsx";
import useUsersStore from "../../../stores/useUsersStore.jsx";

function UserForm({ onSubmit, onClose }) {

    const { selectedUser } = useUsersStore()

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (selectedUser) {
            setUsername(selectedUser.username || "");
            setEmail(selectedUser.email || "");
            setRole(selectedUser.role || "user");
            setIsActive(selectedUser.isActive ?? true);
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            role,
            isActive,
        };

        onSubmit(userData);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['form']} >
            <label htmlFor="username">Pseudo</label>
            <input
                type="text"
                id="username"
                value={username}
                placeholder="Pseudo"
                onChange={handleInputChange(setUsername)}
                className={formClasses['common-input']}
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={handleInputChange(setEmail)}
                className={formClasses['common-input']}
                required
            />

            <label htmlFor="role">Rôle</label>
            <select
                id="role"
                value={role}
                className={formClasses['common-select-input']}
                onChange={handleInputChange(setRole)}
            >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
            </select>

            <label>
                <input
                    type="checkbox"
                    id="isActive"
                    className={formClasses['common-checkbox']}
                    checked={isActive}
                    onChange={handleInputChange(setIsActive)}
                />
                Actif
            </label>

            <Button type="submit" className={'blue-btn'}>Enregistrer</Button>
            {onClose && <Button type="button" onClick={onClose} className={'green-btn'}>Annuler</Button>}
        </form>
    );
}

export default UserForm;
