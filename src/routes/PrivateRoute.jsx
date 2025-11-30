import {useContext} from "react";
import {AuthContext} from "../contexts/auth-context.jsx";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {isLogin} = useContext(AuthContext);

    if (isLogin === undefined) {
        return <p>Chargement...</p>;
    }

    return isLogin ? children : <Navigate to="/login" replace />
}

export default PrivateRoute;