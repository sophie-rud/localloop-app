import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/auth-context.jsx";

function AdminRoute({ children }) {
    const { isLogin, userRole } = useContext(AuthContext);

    if (!isLogin) return <Navigate to="/login" />;
    if (userRole !== "admin") return <Navigate to="/" />;

    return children;
}

export default AdminRoute;
