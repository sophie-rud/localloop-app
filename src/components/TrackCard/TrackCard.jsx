import { Route, History, Triangle } from 'lucide-react';
import photo from '../../assets/images/image-colmar.jpg';
import classes from './TrackCard.module.css';

function TrackCard() {
    // {track.photo} {track.title} {city} {department.cp} {starting_point} {track.distance} {track.duration} {track.difficulty} {track.presentation}

    return (
        <div className={classes['track-card']}>
            <div className={classes['track-card-photo']}>
                <img src={photo} alt='Colmar' className={classes['image']} />
            </div>
            <div className={classes['card-content']}>
                <h3 className={classes['card-title']}>Colmar centre-ville</h3>
                <div className={classes['info-location']}>
                    {/*TODO: affichage de la ville SI ville (depuis place ?)*/}
                    <p>Colmar</p>
                    <p>(68)</p>
                </div>
                <div className={classes['card-infos']}>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Route /> </div>
                        <p> Distance : <strong> 4km </strong> </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <History /> </div>
                        <p> Durée : <strong> 3h </strong> </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Triangle /> </div>
                        {/*TODO : logique d'affichage de la difficulty*/}
                        <p> <strong> Facile </strong> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackCard;
