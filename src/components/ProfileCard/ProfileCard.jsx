import classes from './ProfileCard.module.css'
import {Pencil} from "lucide-react";
import {useContext} from "react";
import {AuthContext} from "../../contexts/auth-context.jsx";

function ProfileCard() {
    const { user } = useContext(AuthContext);

    return (
        <div className={classes['profile-card']}>
            <div className={classes['profile-card-photo']}>
                <img src={user.avatar} alt={user.username} className={classes['image']} />
            </div>
            <div className={classes['user-infos']}>
                <p><strong> {user.username} </strong></p>
                <p className={classes['user-mail']}> {user.email} </p>
            </div>
            <div className={classes['user-edit-icon']}> <Pencil /> </div>
        </div>
    )
}

export default ProfileCard;
