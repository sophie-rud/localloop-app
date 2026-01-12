import PlacesList from "../../../components/Places/PlacesList/PlacesList.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import {useEffect} from "react";
import usePlacesStore from "../../../stores/usePlacesStore.jsx";

function PlacesPage() {
    const { places, getPlaces } = usePlacesStore();

    useEffect(() => {
        getPlaces();
    }, [getPlaces]);

    return (
        <main className={adminClasses['main-admin']}>
            <h1>Les Lieux</h1>
            <section>
                    <PlacesList places={places}></PlacesList>
            </section>
        </main>
    )
}

export default PlacesPage;