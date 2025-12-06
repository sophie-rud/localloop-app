import TrackCard from "../TrackCard/TrackCard.jsx";
import classes from "./TracksList.module.css"

function TracksList({ tracks, onEdit, onDelete }) {

    return(
        <div className={classes['tracks-list']}>
            {tracks && tracks.map(track => (
                <TrackCard
                    track={track}
                    key={track.id}
                    onEdit={onEdit}
                    onDelete={onDelete}
                >
                </TrackCard>
            ))}
        </div>
    )
}

export default TracksList;