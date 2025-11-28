import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>
{
    const [isLogin, setIsLogin] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const login = (role = 'user') => {
        setIsLogin(true);
        setUserRole(role);
    };
    const logout = () => {
        setIsLogin(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{
            isLogin,
            userRole,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
