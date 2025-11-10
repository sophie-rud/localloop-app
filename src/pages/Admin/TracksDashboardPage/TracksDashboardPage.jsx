import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/Button/Button.jsx";
import SearchBar from "../../../layouts/elements/SearchBar/SearchBar.jsx";
import TrackTable from "../../../components/Admin/Tables/TrackTable/TrackTable.jsx";
import TrackTableRow from "../../../components/Admin/TableRow/TrackTableRow/TrackTableRow.jsx";

function TracksDashboardPage() {
    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des parcours</h1>
            <div>
                <SearchBar></SearchBar>
                <Button type="button" className={'green-btn'}>
                    + Ajouter un parcours
                </Button>
            </div>
            <section>
                <TrackTable>
                    <TrackTableRow></TrackTableRow>
                </TrackTable>
            </section>
        </main>
    )
}

export default TracksDashboardPage;