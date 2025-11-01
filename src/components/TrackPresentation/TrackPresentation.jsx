import { MapPin, Route, History, Triangle } from 'lucide-react';
import photo from '../../assets/images/image-colmar.jpg';
import classes from './TrackPresentation.module.css';

function TrackPresentation() {
    // {track.photo} {track.title} {city} {department.cp} {starting_point} {track.distance} {track.duration} {track.difficulty} {track.presentation}

    return (
        <div className={classes['track-presentation']}>
            <div className={classes['track-header']}>
                <div className={classes['track-presentation-photo']}>
                    <img src={photo} alt='Colmar' className={classes['image']} />
                </div>
                <h3 className={classes['track-title']}>Colmar centre-ville</h3>
            </div>
            <div className={classes['track-content']}>
                <div className={classes['info']}>
                    {/*TODO: affichage de la ville SI ville (depuis place ?)*/}
                    <p>Colmar</p>
                    <p>68</p>
                </div>
                {/*TODO: Button 'Ajouter aux favoris'*/}
                <div className={classes['track-infos']}>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <MapPin /> </div>
                        <p> <strong>Point de départ :</strong> parking gare routière </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Route /> </div>
                        <p> <strong>Distance :</strong> 4km </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <History /> </div>
                        <p> <strong> Durée estimée :</strong> 3h </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Triangle /> </div>
                        {/*TODO : logique d'affichage de la difficulty*/}
                        <p>Facile</p>
                    </div>
                </div>
                <p className={classes.presentation}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    )
}

export default TrackPresentation;
