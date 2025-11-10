import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/Button/Button.jsx";
import SearchBar from "../../../layouts/elements/SearchBar/SearchBar.jsx";
import TrackTable from "../../../components/Admin/Tables/TrackTable/TrackTable.jsx";
import TrackTableRow from "../../../components/Admin/TableRow/TrackTableRow/TrackTableRow.jsx";
import StepTable from "../../../components/Admin/Tables/StepTable/StepTable.jsx";

function StepsDashboardPage() {
    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des étapes</h1>
            <div>
                <SearchBar></SearchBar>
            </div>
            <section>
                <StepTable>
                </StepTable>
            </section>
        </main>
    )
}

export default StepsDashboardPage;