import classes from './TrackOverview.module.css'

function TrackOverview({track}) {
    return (
        <div className={classes['track-overview']}>
            <div className={classes['track-overview-photo']}>
                <img src={track.photo} alt={track.title} className={classes['image']} />
            </div>
            <div className={classes['track-overview-infos']}>
                <h3 className={classes['overview-title']}>{track.title}</h3>
                <p>{track.difficulty}</p>
            </div>
        </div>
    )
}

export default TrackOverview;