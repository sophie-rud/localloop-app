import { Route, History, Triangle } from 'lucide-react';
import classes from './TrackCard.module.css';

function TrackCard({ track }) {

    if (!track) return null;

    return (
        <div className={classes['track-card']}>
            <div className={classes['track-card-photo']}>
                <img src={track.photo} alt={track.title} className={classes['image']} />
            </div>
            <h3 className={classes['card-title']}>{track.title}</h3>
            <div className={classes['card-content']}>
                <div className={classes['info-location']}>
                    <p>{track.steps?.[0]?.place?.city}</p>
                    <p>{track.steps?.[0]?.place?.department?.code}</p>
                </div>
                <div className={classes['card-infos']}>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> {} </div>
                        <p> <strong> {track.theme?.name || "inconnu"} </strong> </p>
                    </div><div className={classes['info']}>
                        <div className={classes['icon']}> <Route /> </div>
                        <p> Distance : <strong> {track.distance} </strong> </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <History /> </div>
                        <p> Durée : <strong> {track.duration} </strong> </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Triangle /> </div>
                        <p> <strong> {track.difficulty} </strong> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackCard;
