// import useReferenceData from "../../../hooks/useThemesAndDepartmentData.jsx";
import PlacesList from "../../../components/Places/PlacesList/PlacesList.jsx";
import useStepsAndPlaces from "../../../hooks/useStepsAndPlacesData.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

function PlacesPage() {

    const { places } = useStepsAndPlaces();
    // const { departments } = useReferenceData();
    const navigate = useNavigate();

    const handleClickCreate = () => {
        navigate(`/admin/:id/places/create`)
    }

    return (
        <main className={adminClasses['main-admin']}>
            <h1>Les Lieux</h1>
            <div>
                {/*<FilterBar filters={filters} setFilters={setFilters} />*/}
            </div>
            <Button type="button" className={'green-btn'} onClick={() => handleClickCreate()}>
                + Ajouter un lieu
            </Button>
            <section>
                    <PlacesList places={places}></PlacesList>
            </section>

        </main>
    )
}

export default PlacesPage;