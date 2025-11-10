import UserTable from "../../../components/Admin/Tables/UserTable/UserTable.jsx";
import UserTableRow from "../../../components/Admin/TableRow/UserTableRow/UserTableRow.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/Button/Button.jsx";
import SearchBar from "../../../layouts/elements/SearchBar/SearchBar.jsx";

function UserDashboardPage() {
    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des utilisateurs</h1>
            <div>
                <SearchBar></SearchBar>
                <Button type="button" className={'green-btn'}>
                    + Ajouter un utilisateur
                </Button>
            </div>
            <section>
                <UserTable>
                    <UserTableRow></UserTableRow>
                </UserTable>
            </section>
        </main>
    )
}

export default UserDashboardPage;