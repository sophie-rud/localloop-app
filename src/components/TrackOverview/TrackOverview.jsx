import classes from './TrackOverview.module.css'
import photo from "../../assets/images/image-colmar.jpg";

function TrackOverview({track}) {
    return (
        <div className={classes['track-overview']}>
            <div className={classes['track-overview-photo']}>
                <img src={photo} alt='Colmar' className={classes['image']} />
            </div>
            <div className={classes['track-overview-infos']}>
                <h3 className={classes['overview-title']}>Colmar centre-ville</h3>
                {/*<p>(68)</p>*/}
                <p>Facile</p>
            </div>
        </div>
    )
}

export default TrackOverview;