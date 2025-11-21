import TrackCard from "../../TrackCard/TrackCard.jsx";
import classes from "./TracksList.module.css"

function TracksList({tracks, renderCardChildren}) {

    return(
        <div className={classes['tracks-list']}>
            {tracks && tracks.map(track => (
                        <TrackCard track={track} key={track.id} >
                            {renderCardChildren && renderCardChildren(track)}
                        </TrackCard>
            ))}
        </div>
    )
}

export default TracksList;