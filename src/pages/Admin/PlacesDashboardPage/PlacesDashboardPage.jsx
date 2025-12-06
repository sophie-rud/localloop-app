import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/ui/Button/Button.jsx";
import SearchBar from "../../../components/ui/SearchBar/SearchBar.jsx";
import PlaceTable from "../../../components/Admin/Tables/PlaceTable/PlaceTable.jsx";
import {useEffect, useState} from "react";
import usePlacesStore from "../../../stores/usePlacesStore.jsx";
import CommonModal from "../../../components/ui/CommonModal/CommonModal.jsx";
import PlaceForm from "../../../components/Forms/PlaceForm/PlaceForm.jsx";

function PlacesDashboardPage() {
    const { places, getPlaces, selectedPlace, setSelectedPlace, addPlace, editPlace, removePlace } = usePlacesStore();

    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        getPlaces();
    }, [getPlaces]);

    const openCreateForm = () => {
        setSelectedPlace(null);
        setIsFormOpen(true);
    };

    const openEditForm = (place) => {
        setSelectedPlace(place);
        setIsFormOpen(true);
    };

    const handleSubmit = async (data) => {
        if (selectedPlace) {
            await editPlace({...selectedPlace, ...data});
        } else {
            await addPlace(data);
        }
        setIsFormOpen(false);
    };

    const handleDelete = async (place) => {
        await removePlace(place);
    };

    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des lieux</h1>
            <div>
                {/*<SearchBar />*/}
                <Button type="button" className={'green-btn'} onClick={openCreateForm} >
                    + Ajouter un lieu
                </Button>
            </div>
            <section>
                <PlaceTable places={places} onEdit={openEditForm} onDelete={handleDelete} />
            </section>

            {isFormOpen && (
                <CommonModal onClose={() => setIsFormOpen(false)}>
                    <PlaceForm
                        onSubmit={handleSubmit}
                        onClose={() => setIsFormOpen(false)}
                    />
                </CommonModal>
            )}
        </main>
    )
}

export default PlacesDashboardPage;