import TrackCard from "../../TrackCard/TrackCard.jsx";
import useFetch from "../../../hooks/use-fetch.jsx";
import {useEffect} from "react";
import classes from "./TracksList.module.css"

function TracksList() {

    const {result: tracks, request} = useFetch("http://localhost:3000/tracks");

    useEffect(() => {
        request()
    }, [])


    return(
        <div className={classes['tracks-list']}>
            {tracks && tracks.map(track => (
                <TrackCard track={track} key={track.id} />
            ))}
        </div>
    )
}

export default TracksList;