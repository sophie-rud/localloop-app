import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/Button/Button.jsx";
import SearchBar from "../../../layouts/elements/SearchBar/SearchBar.jsx";
import TrackTable from "../../../components/Admin/Tables/TrackTable/TrackTable.jsx";
import TrackTableRow from "../../../components/Admin/TableRow/TrackTableRow/TrackTableRow.jsx";
import StepTable from "../../../components/Admin/Tables/StepTable/StepTable.jsx";
import PlaceTable from "../../../components/Admin/Tables/PlaceTable/PlaceTable.jsx";

function PlacesDashboardPage() {
    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des lieux</h1>
            <div>
                <SearchBar></SearchBar>
                <Button type="button" className={'green-btn'}>
                    + Ajouter un lieu
                </Button>
            </div>
            <section>
                <PlaceTable>
                </PlaceTable>
            </section>
        </main>
    )
}

export default PlacesDashboardPage;