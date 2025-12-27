import {useState, useEffect, useContext} from "react";
import formClasses from '../Forms.module.css';
import classes from "./UserEditForm.module.css";
import Button from "../../ui/Button/Button.jsx";
import {AuthContext} from "../../../contexts/auth-context.jsx";

function UserEditForm({ onSubmit, onClose, onDelete }) {

    const { user } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setEmail(user.email || "");
            setAvatar(user.avatar || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            avatar,
        };

        onSubmit(userData);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['form']} >
            <div className={classes['delete-profile-btn']}>
                <Button type="submit" onClick={onDelete} className={'small-green-btn'}>
                    Supprimer mon profil
                </Button>
            </div>

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

            <label htmlFor="avatar">Avatar</label>
            <input
                // type="file"
                id="avatar"
                value={avatar}
                className={formClasses['common-select-input']}
                onChange={handleInputChange(setAvatar)}
            />

            <div>
                <Button type="submit" className={'small-blue-btn'}>Enregistrer</Button>
                {onClose && <Button type="button" onClick={onClose} className={'small-green-btn'}>Annuler</Button>}
            </div>
        </form>
    );
}

export default UserEditForm;
