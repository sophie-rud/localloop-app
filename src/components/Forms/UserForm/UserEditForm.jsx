import {useState, useContext} from "react";
import formClasses from '../Forms.module.css';
import classes from "./UserEditForm.module.css";
import Button from "../../ui/Button/Button.jsx";
import {AuthContext} from "../../../contexts/auth-context.jsx";

function UserEditForm({ onSubmit, onClose, onDelete }) {

    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        avatar: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['form']} >
            <div className={classes['delete-profile-btn']}>
                <Button type="button" onClick={onDelete} className={'small-green-btn'}>
                    Supprimer mon profil
                </Button>
            </div>

            <label htmlFor="username">Pseudo</label>
            <input
                type="text"
                id="username"
                value={formData.username}
                placeholder="Pseudo"
                onChange={handleInputChange('username')}
                className={formClasses['common-input']}
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleInputChange('email')}
                className={formClasses['common-input']}
                required
            />

            <label htmlFor="avatar">Avatar</label>
            <input
                type="file"
                id="avatar"
                accept="image/*"
                className={formClasses['common-file-input']}
                onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData(prev => ({ ...prev, avatar: file }));
                }}
            />

            <div>
                <Button type="submit" className={'small-blue-btn'}>Enregistrer</Button>
                {onClose && <Button type="button" onClick={onClose} className={'small-green-btn'}>Annuler</Button>}
            </div>
        </form>
    );
}

export default UserEditForm;
