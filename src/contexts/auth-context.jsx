import { createContext, useState, useEffect } from "react";
import { getRequest, postRequest } from "../services/request.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>
{
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged in
        const checkUser = async () => {
            try {
                const data = await getRequest("/me");
                setUser(data);
                setIsLogin(true);
            } catch (error) {
                console.error(error);
                setUser(null);
                setIsLogin(false);
            }
        };
        checkUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsLogin(true);
    };

    const logout = async () => {
        try {
            await postRequest("/logout");
        } catch (error) {
            console.error(error);
        }
        setUser(null);
        setIsLogin(false);
    };

    return (
        <AuthContext.Provider value={{
            isLogin,
            user,
            login,
            logout,
            setUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
