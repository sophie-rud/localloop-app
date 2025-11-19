import { create } from "zustand";

const useUsersStore = create((set) => {
    return {
        users: [],
        setUsers: (users) => set({users}),
        addUser: (newUser) => set((state) => {
            return {
                users: [...state.tracks, newUser]
            }
        }),
        // blockUser: (id) => set((state) => {
        //
        // }),
        removeUser: (id) => set((state) => {
            return {
                users: state.users.filter(user => user.id !== id)
            }
        }),
        editUser: (updatedUser) => set((state) => {
            return {
                users: state.users.map((user) => user.id === updatedUser.id ? updatedUser : user)
            }
        })
    }
});

export default useUsersStore;