import TracksList from "../../../components/Tracks/TracksList/TracksList.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../../contexts/auth-context.jsx";
import {useFavorites} from "../../../hooks/useFavorites.jsx";

function FavoriteTracksPage() {
    const { user, isLogin } = useContext(AuthContext);
    const { favorites, loadFavorites } = useFavorites();

    useEffect(() => {
        loadFavorites();
    }, [user?.id]);

    if (isLogin === undefined) return <p>Chargement...</p>;
    if (!isLogin) return <p>Connectez-vous pour voir vos favoris</p>;

    if (favorites?.length === 0) {
        return <p>Vous n'avez pas encore de favoris</p>;
    }

    return (
        <main>
            <h1>Mes parcours favoris</h1>
            <div>
                <TracksList tracks={favorites} />
            </div>
        </main>
    )
}

export default FavoriteTracksPage;
