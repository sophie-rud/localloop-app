import LoginForm from "../../components/Forms/LoginForm/LoginForm.jsx";
import classes from './LoginPage.module.css'

function LoginPage() {
    return (
        <main className={classes['login-page']}>
            <p>Bienvenue sur</p>
            <h1>LocalLoop !</h1>
            <p>Explorer ce qui se cache autour de vous</p>
            <div>
                <LoginForm />
                <a href="">Créer un compte</a>
            </div>
        </main>
    )
}

export default LoginPage;