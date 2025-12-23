import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/auth-context.jsx";

function AdminRoute({ children }) {
    const { isLogin, user } = useContext(AuthContext);

    if (isLogin === undefined) return <p>Chargement...</p>;

    if (!isLogin) return <Navigate to="/login" />;
    if (!user || user.roleId !== 2) return <Navigate to="/" />;

    return children;
}

export default AdminRoute;
