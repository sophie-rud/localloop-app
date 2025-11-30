import classes from "./PlacesList.module.css"
import PlaceCard from "../PlaceCard/PlaceCard.jsx";

function PlacesList({places}) {

    return(
        <div className={classes['places-list']}>
            {places && places.map(place => (
                <PlaceCard place={place} key={place.id} >
                </PlaceCard>
            ))}
        </div>
    )
}

export default PlacesList;