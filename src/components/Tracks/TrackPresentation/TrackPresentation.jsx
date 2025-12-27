import { MapPin, Route, History, Triangle } from 'lucide-react';
import classes from './TrackPresentation.module.css';
import Button from "../../ui/Button/Button.jsx";
import { minutesToDurationString } from "../../../utils/duration.js";
import useUsersStore from "../../../stores/useUsersStore.jsx";

function TrackPresentation({ track }) {
    const { currentUser, toggleFavorite } = useUsersStore();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const isFavorite = currentUser.favorites?.includes(track.id);

    const firstStep = track.steps?.[0];
    const place = firstStep?.place;
    const department = place?.department;

    return (
        <div className={classes['track-presentation']}>
            <div className={classes['track-header']}>
                <div className={classes['track-presentation-photo']}>
                    <img src={`${baseUrl}${track.photo}`} alt={track.title} className={classes['image']} />
                </div>
                <h3 className={classes['track-title']}>{track.title}</h3>
            </div>
            <div className={classes['track-content']}>
                <div className={classes['track-infos-header']}>
                    <div className={classes['info-location']}>
                        <p>{place?.city}</p>
                        <p>( {department?.code} )</p>
                    </div>
                    <Button type="button" className={'small-green-btn'} onClick={() => toggleFavorite(track.id)} >
                        {isFavorite ? "Favori" : "+ Ajouter aux favoris"}
                    </Button>
                </div>
                <div className={classes['track-infos']}>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> {track.theme?.icon} </div>
                        <p>{track?.theme?.name}</p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <MapPin /> </div>
                        <p> <strong>Point de départ :</strong> {firstStep.name} </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Route /> </div>
                        <p> <strong>Distance :</strong> {track.distance} km</p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <History /> </div>
                        <p> <strong> Durée estimée :</strong> {minutesToDurationString(track.duration)} </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Triangle /> </div>
                        <p> {track.difficulty} </p>
                    </div>
                </div>
                <p className={classes.presentation}> {track.presentation} </p>
            </div>
        </div>
    )
}

export default TrackPresentation;
