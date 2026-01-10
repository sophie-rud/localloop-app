import LoginForm from "../../../components/Forms/LoginForm/LoginForm.jsx";
import classes from '../SignupAndLoginPage.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {postRequest} from "../../../services/request.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../contexts/auth-context.jsx";

function LoginPage() {
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        if (user.roleId === 2) {
            navigate('/admin/profile');
        } else {
            navigate('/user/profile');
        }
    }, [navigate, user]);

    const handleLogin = async ({ email, password }) => {
        setError(null);

        let response;
        try {
            response = await postRequest('/login', { email, password });
        } catch (error) {
            setError(error.message);
            return;
        }

        login(response.user);
    };

    return (
        <main className={classes['login-page']}>
            <div className='title-block'>
                <p>Bienvenue sur</p>
                <h1>LocalLoop !</h1>
                <p>Explorer ce qui se cache autour de vous</p>
            </div>
            <div>
                <LoginForm onSubmit={handleLogin} />
                <NavLink to="/signup">
                    <span>Créer un compte</span>
                </NavLink>
            </div>
            {error && <p className="error">{error}</p>}
        </main>
    )
}

export default LoginPage;