import { Route, History, Triangle } from 'lucide-react';
import classes from './TrackCard.module.css';
import {useNavigate} from "react-router-dom";
import { minutesToDurationString } from "../../../utils/duration.js";
import Button from "../../ui/Button/Button.jsx";
import useTracksStore from "../../../stores/useTracksStore.jsx";
import {useState} from "react";
import DeletionModal from "../../ui/DeletionModal/DeletionModal.jsx";

function TrackCard({ track, onEdit, onDelete }) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { setSelectedTrack } = useTracksStore();
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const firstStep = track.steps?.[0];
    const place = firstStep?.place;
    const department = place?.department;

    return (
        <div className={classes['track-card']}>
            <div className={classes['track-card-photo']}>
                <img src={`${baseUrl}${track.photo}`} alt={track.title} crossOrigin='anonymous' className={classes['image']} />
            </div>
            <h3 className={classes['card-title']}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setSelectedTrack(track);
                    navigate(`/tracks/${track.id}`)
                }}
            >
                {track.title}
            </h3>
            <div className={classes['card-content']}>
                <div className={classes['info-location']}>
                    <p>{place?.city}</p>
                    <p>({department?.code})</p>
                </div>
                <div className={classes['card-infos']}>
                    <div className={classes['info']}>
                        <div className={classes['icon']}> {track.theme?.icon} </div>
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
            {(onEdit || onDelete) && (
                <div className={classes['actions']}>
                    {onEdit && (
                        <Button
                            type="button"
                            className="small-green-btn"
                            onClick={() => onEdit(track)}
                        >
                            Éditer
                        </Button>
                    )}

                    {onDelete && (
                        <Button
                            type="button"
                            className="small-blue-btn"
                            onClick={() => setModalOpen(true)}
                        >
                            Supprimer
                        </Button>
                    )}
                    <DeletionModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onConfirm={() => {
                            onDelete(track);
                            setModalOpen(false);
                        }}
                        itemName={track.title}
                    />
                </div>
            )}
        </div>
    )
}

export default TrackCard;
