import { Route, History, Triangle } from 'lucide-react';
import classes from './TrackCard.module.css';
import {useNavigate} from "react-router-dom";
import { minutesToDurationString } from "../../utils/duration.js";
import useTracksStore from "../../stores/useTracksStore.jsx";
import Button from "../Button/Button.jsx";

function TrackCard({ track, onEdit, onDelete }) {
    const navigate = useNavigate();
    const { loading, error } = useTracksStore();

    if (loading) return <p>Chargement des informations...</p>;
    if (error) return <p>Erreur: {error}</p>;
    if (!track) return <p>Pas de parcours trouvé</p>;

    return (
        <div className={classes['track-card']}>
            <div className={classes['track-card-photo']}>
                <img src={track.photo} alt={track.title} className={classes['image']} />
            </div>
            <h3 className={classes['card-title']}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/tracks/${track.id}`)}
            >
                {track.title}
            </h3>
            <div className={classes['card-content']}>
                <div className={classes['info-location']}>
                    <p>{track.place?.city}</p>
                    <p>({track.department?.code})</p>
                </div>
                <div className={classes['card-infos']}>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> {} </div>
                        <p> <strong> {track.theme?.name || "inconnu"} </strong> </p>
                    </div><div className={classes['info']}>
                        <div className={classes['icon']}> <Route /> </div>
                        <p> Distance : <strong> {track.distance} km </strong> </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <History /> </div>
                        <p> Durée : <strong> {minutesToDurationString(track.duration)} </strong> </p>
                    </div>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> <Triangle /> </div>
                        <p> <strong> {track.difficulty} </strong> </p>
                    </div>
                </div>
            </div>
            { (onEdit || onDelete) && (
                <div className="actions">
                    { onEdit && (
                        <Button
                            type="button"
                            className="green-btn"
                            onClick={() => onEdit(track)}
                        >
                            Éditer
                        </Button>
                    )}

                    { onDelete && (
                        <Button
                            type="button"
                            className="blue-btn"
                            onClick={() => onDelete(track)}
                        >
                            Supprimer
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default TrackCard;
