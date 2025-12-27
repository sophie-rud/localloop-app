import classes from './ProfileCard.module.css'
import {Pencil} from "lucide-react";

function ProfileCard({ user, onEditClick }) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div className={classes['profile-card']}>
            <div className={classes['profile-card-photo']}>
                <img src={`${baseUrl}${user.avatar}`} alt={user.username} className={classes['image']} />
            </div>
            <div className={classes['user-infos']}>
                <p><strong> {user.username} </strong></p>
                <p className={classes['user-mail']}> {user.email} </p>
            </div>
            <div className={classes['user-edit-icon']} onClick={onEditClick} >
                <Pencil />
            </div>
        </div>
    )
}

export default ProfileCard;
