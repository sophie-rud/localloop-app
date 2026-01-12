import UserTable from "../../../components/Admin/Tables/UserTable/UserTable.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/ui/Button/Button.jsx";
import SearchBar from "../../../components/ui/SearchBar/SearchBar.jsx";
import useUsersStore from "../../../stores/useUsersStore.jsx";
import {useEffect, useState} from "react";
import UserForm from "../../../components/Forms/UserForm/UserForm.jsx";
import CommonModal from "../../../components/ui/CommonModal/CommonModal.jsx";
import {postRequest} from "../../../services/request.jsx";

function UserDashboardPage() {
    const { users, loadUsers, selectedUser, setSelectedUser, addUser, editUser, removeUser } = useUsersStore();
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const openCreateForm = () => {
        setSelectedUser(null);
        setIsFormOpen(true);
    };

    const openEditForm = (user) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleSubmit = async (data) => {
        if (selectedUser) {
            await editUser(selectedUser.id, data);
        } else {
            await addUser(data);
        }
        setIsFormOpen(false);
        loadUsers();
    };

    const handleDelete = async (userId) => {
        await removeUser(userId);
    };

    const handleToggleBlock = async (user) => {
        const action = user.isActive ? "Bloquer" : "Débloquer";
        if (window.confirm(`${action} ${user.username} ?`)) {
            await postRequest(`/users/${user.id}/toggle-block`)
        }
        loadUsers();
    };


    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des utilisateurs</h1>
            <div>
                {/*<SearchBar />*/}
                <Button type="button" className={'green-btn'} onClick={openCreateForm} >
                    + Ajouter un utilisateur
                </Button>
            </div>
            <section>
                <UserTable users={users} onEdit={openEditForm} onDelete={handleDelete} onBlock={handleToggleBlock} />
            </section>

            {isFormOpen && (
                <CommonModal onClose={() => setIsFormOpen(false)}>
                    <UserForm
                        onSubmit={handleSubmit}
                        onClose={() => setIsFormOpen(false)}
                    />
                </CommonModal>
            )}
        </main>
    )
}

export default UserDashboardPage;