import { useState, useEffect } from "react";
import formClasses from '../Forms.module.css';
import Button from "../../ui/Button/Button.jsx";
import useUsersStore from "../../../stores/useUsersStore.jsx";
import {hasErrors, validateForm, validators} from "../../../utils/validators.js";

function UserForm({ onSubmit, onClose }) {
    const { selectedUser } = useUsersStore()

    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState(1);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (selectedUser) {
            setUsername(selectedUser.username || "");
            setEmail(selectedUser.email || "");
            setRoleId(selectedUser.roleId ?? 1);
            setIsActive(selectedUser.isActive ?? true);
        }
    }, [selectedUser]);

    const validationRules = {
        email: validators.email,
        username: validators.username,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            roleId,
            isActive,
        };

        setErrors({});
        const formErrors = validateForm(userData, validationRules);
        setErrors(formErrors);

        if(hasErrors(formErrors)) {
            return;
        }

        onSubmit(userData);
    };

    const handleInputChange = (setter) => (e) => {
        const value =
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value;

        setter(value);
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['form']} >
            <div className={formClasses['input-container']}>
                {errors.username && <p className={formClasses['error']}>{errors.username}</p>}
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
            </div>

            <div className={formClasses['input-container']}>
                {errors.email && <p className={formClasses['error']}>{errors.email}</p>}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleInputChange(setEmail)}
                    className={formClasses['common-input']}
                    required
                />
            </div>

            <div className={formClasses['input-container']}>
                <label htmlFor="roleId">Rôle</label>
                <select
                    id="roleId"
                    value={roleId}
                    className={formClasses['common-select-input']}
                    onChange={handleInputChange(setRoleId)}
                >
                    <option value="1">Utilisateur</option>
                    <option value="2">Admin</option>
                </select>
            </div>

            <div className={formClasses['input-container']}>
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
            </div>

            <Button type="submit" className={'blue-btn'}>Enregistrer</Button>
            {onClose && <Button type="button" onClick={onClose} className={'green-btn'}>Annuler</Button>}
        </form>
    );
}

export default UserForm;
