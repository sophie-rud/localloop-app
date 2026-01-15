import classes from './TrackOverview.module.css'

function TrackOverview({track}) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div className={classes['track-overview']}>
            <div className={classes['track-overview-photo']}>
                <img src={`${baseUrl}${track.photo}`} alt={track.title} crossOrigin='anonymous' className={classes['image']} />
            </div>
            <div className={classes['track-overview-infos']}>
                <h3 className={classes['overview-title']}>{track.title}</h3>
                <p>{track.difficulty}</p>
            </div>
        </div>
    )
}

export default TrackOverview;