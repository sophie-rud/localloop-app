import {useContext} from 'react';
import {deleteRequest, getRequest, postRequest} from "../services/request.jsx";
import {AuthContext} from "../contexts/auth-context.jsx";

export function useFavorites() {
    const { user, setUser } = useContext(AuthContext);

    async function loadFavorites() {
        if (!user?.id) return;

        try {
            const favorites = await getRequest("/favorites");
            setUser(prevUser => ({
                ...prevUser,
                favorites,
            }));
        } catch (error) {
            console.error('Erreur loadFavorites:', error);
            throw error;
        }
    }

    const loadFavoriteIds = async () => {
        if (!user?.id) return;
        try {
            const ids = await getRequest("/favorites/ids");
            setUser(prevUser => ({
                ...prevUser,
                favoriteIds: ids,
            }));
        } catch (error) {
            console.error('Erreur loadFavoriteIds:', error);
        }
    };

    const isTrackFavorite = (trackId) => {
        return user?.favoriteIds?.includes(parseInt(trackId)) || false;
    };

    async function addFavorite(trackId) {
        try {
            const data = await postRequest(`/favorites/${trackId}`);

            setUser(prevUser => ({
                ...prevUser,
                favoritesIds: [...(prevUser.favorites || []), Number(trackId)],
            }));

            return data;
        } catch (error) {
            console.error('Erreur addFavorite:', error);
            throw error;
        }
    }

    async function removeFavorite(trackId) {
        try {
            await deleteRequest(`/favorites/${trackId}`);

            setUser(prevUser => ({
                ...prevUser,
                favoritesIds: prevUser.favorites?.filter(id => id !== Number(trackId)) || [],
            }));
        } catch (error) {
            console.error('Erreur removeFavorite:', error);
            throw error;
        }
    }

    return {
        favorites: user?.favorites || [],
        favoriteIds: user?.favoriteIds || [],
        loadFavorites,
        loadFavoriteIds,
        addFavorite,
        removeFavorite,
        isTrackFavorite,
    };
}
