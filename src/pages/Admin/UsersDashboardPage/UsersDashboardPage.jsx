import UserTable from "../../../components/Admin/Tables/UserTable/UserTable.jsx";
import adminClasses from "../../../layouts/AdminLayout/AdminLayout.module.css";
import Button from "../../../components/Button/Button.jsx";
import SearchBar from "../../../layouts/elements/SearchBar/SearchBar.jsx";
import useUsersStore from "../../../stores/useUsersStore.jsx";
import {useEffect, useState} from "react";
import UserForm from "../../../components/Forms/UserForm/UserForm.jsx";
import CommonModal from "../../../components/Modals/CommonModal/CommonModal.jsx";

function UserDashboardPage() {
    const { users, getUsers, selectedUser, setSelectedUser, addUser, editUser, removeUser } = useUsersStore();

    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

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
            await editUser({...selectedUser, ...data});
        } else {
            await addUser(data);
        }
        setIsFormOpen(false);
    };

    const handleDelete = async (user) => {
        await removeUser(user);
    };

    const handleToggleBlock = async (user) => {
        const action = user.isActive ? "Bloquer" : "Débloquer";
        if (window.confirm(`${action} ${user.username} ?`)) {
            await editUser({...user, isActive: !user.isActive});
        }
    };


    return (
        <main className={adminClasses['main-admin']}>
            <h1>Tableau de bord des utilisateurs</h1>
            <div>
                <SearchBar></SearchBar>
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
                        data={selectedUser}
                        onSubmit={handleSubmit}
                        onClose={() => setIsFormOpen(false)}
                    />
                </CommonModal>
            )}
        </main>
    )
}

export default UserDashboardPage;