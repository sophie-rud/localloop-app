import { MapPin } from 'lucide-react';
import classes from './PlaceCard.module.css';

function PlaceCard({ place }) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <div className={classes['place-card']}>
            <div className={classes['place-card-photo']}>
                <img src={`${baseUrl}${place.photo}`} alt={place.name} crossOrigin='anonymous' className={classes['image']} />
            </div>

            <h3 className={classes['place-title']}>
                {place.name}
            </h3>

            <div className={classes['place-content']}>
                <div className={classes['info-location']}>
                    <MapPin className={classes['icon']} />
                    <p>{place.city}</p>
                </div>

                <div className={classes['description']}>
                    <p>{place.description}</p>
                </div>

                <div className={classes['coordinates']}>
                    <div className={classes['info']}>
                        <p>Latitude : <strong>{place.latitude}</strong></p>
                    </div>
                    <div className={classes['info']}>
                        <p>Longitude : <strong>{place.longitude}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceCard;
