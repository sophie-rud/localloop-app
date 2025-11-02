import classes from './ProfileCard.module.css'
import photo from "../../assets/images/image-colmar.jpg";
import {Pencil} from "lucide-react";

function ProfileCard() {
    return (
        <div className={classes['profile-card']}>
            <div className={classes['profile-card-photo']}>
                <img src={photo} alt='Colmar' className={classes['image']} />
            </div>
            <div className={classes['user-infos']}>
                <p><strong>lily.stadt68</strong></p>
                <p className={classes['user-mail']}>lily.stadt@gmail.com</p>
            </div>
            <div className={classes['user-edit-icon']}> <Pencil /> </div>
        </div>
    )
}

export default ProfileCard;