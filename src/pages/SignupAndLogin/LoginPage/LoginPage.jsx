import LoginForm from "../../../components/Forms/LoginForm/LoginForm.jsx";
import classes from '../SignupAndLoginPage.module.css';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <main className={classes['login-page']}>
            <div className='title-block'>
                <p>Bienvenue sur</p>
                <h1>LocalLoop !</h1>
                <p>Explorer ce qui se cache autour de vous</p>
            </div>
            <div>
                <LoginForm />
                <Link to="/signup">
                    <span>Créer un compte</span>
                </Link>
            </div>
        </main>
    )
}

export default LoginPage;