import LoginForm from "../../../components/Forms/LoginForm/LoginForm.jsx";
import classes from '../SignupAndLoginPage.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {postRequest} from "../../../services/request.jsx";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/auth-context.jsx";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {

        const response = await postRequest("/login", { email, password });
        const userData = response.user;

        login(userData);

        if (userData.roleId === 2) {
            navigate('/admin/profile');
        } else if (userData.roleId === 1) {
            navigate('/user/profile');
        }
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
        </main>
    )
}

export default LoginPage;