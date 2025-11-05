import photo from "../../../../assets/images/image-colmar.jpg";
import classes from './AdminUserCard.module.css';
import { Ban, Trash2 } from 'lucide-react';
import Button from "../../../Button/Button.jsx";

function AdminUserCard() {
    return (
        <div className={classes['user-card']}>
            <img src={photo} alt="avatar" className={classes['avatar']} />
            <div className={classes['infos']}>
                <p>Jean Dupont</p>
                <p>Admin</p>
                <p>jean.dupont@mail.com</p>
            </div>
            <div className={classes['actions']}>
                <Button type="submit" className={'blue-btn'}> <Ban /> </Button>
                <Button type="submit" className={'green-btn'}> <Trash2 /> </Button>
            </div>
        </div>
    )
}

export default AdminUserCard;