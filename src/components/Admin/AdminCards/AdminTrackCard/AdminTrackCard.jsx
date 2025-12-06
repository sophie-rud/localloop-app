import photo from "../../../../assets/images/image-colmar.jpg";
import adminClasses from '../AdminCard.module.css';
import { Pen, Trash2} from 'lucide-react';
import Button from "../../../ui/Button/Button.jsx";

function AdminTrackCard() {
    return (
        <div className={adminClasses['user-card']}>
            <img src={photo} alt="avatar" className={adminClasses['avatar']} />
            <div className={adminClasses['infos']}>
                <p>Colmar centre-ville</p>
                <p>3h</p>
                <p>4km</p>
                <p>Facile</p>
                <p>Jean</p>
                <p>10/11/2025</p>
            </div>
            <div className={adminClasses['actions']}>
                <Button type="submit" className={'blue-btn'}> <Pen /> </Button>
                <Button type="submit" className={'green-btn'}> <Trash2 /> </Button>
            </div>
        </div>
    )
}

export default AdminTrackCard;