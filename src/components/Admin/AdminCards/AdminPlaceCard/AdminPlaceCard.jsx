import photo from "../../../../assets/images/image-colmar.jpg";
import adminClasses from '../AdminCard.module.css';
import {Pen, Trash2} from 'lucide-react';
import Button from "../../../ui/Button/Button.jsx";

function AdminPlaceCard() {
    return (
        <div className={adminClasses['user-card']}>
            <img src={photo} alt="avatar" className={adminClasses['avatar']} />
            <div className={adminClasses['infos']}>
                <p>Quai de la poissonnerie</p>
                <p>Colmar</p>
                <p>68</p>
                <p>Latitude : 48°04'27.2"N</p>
                <p>Longitude : 7°21'35.1"E</p>
                <p>Jean</p>
            </div>
            <div className={adminClasses['actions']}>
                <Button type="submit" className={'blue-btn'}> <Pen /> </Button>
                <Button type="submit" className={'green-btn'}> <Trash2 /> </Button>
            </div>
        </div>
    )
}

export default AdminPlaceCard;