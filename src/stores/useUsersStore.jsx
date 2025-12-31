import { create } from "zustand";
import withLoadingAndError from "../services/withLoadingAndError.jsx";
import {deleteRequest, getRequest, postRequest, putRequest} from "../services/request.jsx";

const useUsersStore = create((set, get) => {
    return {
        users: [],
        setUsers: (users) => set({users}),
        selectedUser: null,
        setSelectedUser: (user) => set({selectedUser: user}),
        loading: false,
        error: null,
        loadUsers: () => withLoadingAndError(set, async () => {
            const users = await getRequest("/users");
            set({ users });
        }),
        signup: (user) => withLoadingAndError(set, async () => {
            const newUser = await postRequest("/signup", user);
            set((state) => ({ users: [...state.users, newUser] }));
            return newUser;
        }),
        addUser: (user) => withLoadingAndError(set, async () => {
            const newUser = await postRequest("/users", user);
            set((state) => ({ users: [...state.users, newUser] }));
            return newUser;
        }),
        removeUser: (id) => withLoadingAndError(set, async () => {
            await deleteRequest(`/users/${id}`);
            set((state) => ({ users: state.users.filter(user => user.id !== id) }));
        }),
        editUser: (id, userData) => withLoadingAndError(set, async () => {
            const updatedUser = await putRequest(`/users/${id}`, userData);
            set((state) => ({
                users: state.users.map((user) => user.id === updatedUser.id ? updatedUser : user)
            }));
            return updatedUser;
        }),
        loadUserById: (id) => {
            return get().users.find((user) => user.id === id) || null;
        },
        currentUser: {
            id: 2,
            favorites: [],
        },
        toggleFavorite: (trackId) => set((state) => ({
                currentUser: {
                    ...state.currentUser,
                    favorites: state.currentUser.favorites?.includes(trackId)
                        ? state.currentUser.favorites.filter((id) => parseInt(id) !== parseInt(trackId))
                        : [...(state.currentUser.favorites || []), trackId],
                },
        })),
    }
});

export default useUsersStore;