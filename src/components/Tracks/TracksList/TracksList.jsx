import TrackCard from "../../TrackCard/TrackCard.jsx";
import {useEffect} from "react";
import classes from "./TracksList.module.css"
import useTracksStore from "../../../stores/useTracksStore.jsx";
import useFetchTracks from "../../../hooks/use-fetch-tracks.jsx";
import {Link} from "react-router-dom";

function TracksList() {

    const {tracks} = useTracksStore();
    const {request} = useFetchTracks();

    useEffect(() => {
        request()
    }, [])


    return(
        <div className={classes['tracks-list']}>
            {tracks && tracks.map(track => (
                <Link to={`/tracks/${Number(track.id)}`} key={Number(track.id)}>
                    <TrackCard track={track} />
                </Link>
            ))}
        </div>
    )
}

export default TracksList;