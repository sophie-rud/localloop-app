import { MapPin, Route, History, Triangle } from 'lucide-react';
import classes from './TrackPresentation.module.css';
import Button from "../Button/Button.jsx";
import { minutesToDurationString } from "../../utils/duration.js";
import useTracksStore from "../../stores/useTracksStore.jsx";
import useUsersStore from "../../stores/useUsersStore.jsx";

function TrackPresentation({track, steps}) {
    const { loading, error } = useTracksStore();
    const { currentUser, toggleFavorite } = useUsersStore();

    if (loading) return <p>Chargement des informations...</p>;
    if (error) return <p>Erreur: {error}</p>;
    if (!track) return <p>Pas de parcours sélectionné</p>;

    const isFavorite = currentUser.favorites?.includes(track.id);

    return (
        <div className={classes['track-presentation']}>
            <div className={classes['track-header']}>
                <div className={classes['track-presentation-photo']}>
                    <img src={track.photo} alt={track.title} className={classes['image']} />
                </div>
                <h3 className={classes['track-title']}>{track.title}</h3>
            </div>
            <div className={classes['track-content']}>
                <p>{track?.theme?.name}</p>
                <div className={classes['info']}>
                    <p>{steps?.[0].place?.city}</p>
                    <p>{steps?.[0].place?.department?.code}</p>
                </div>
                <Button type="button" className={'green-btn'} onClick={() => toggleFavorite(track.id)} >
                    {isFavorite ? "Favori" : "+ Ajouter aux favoris"}
                </Button>
                <div className={classes['track-infos']}>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <MapPin /> </div>
                        <p> <strong>Point de départ :</strong> {steps?.[0].name} </p>
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
