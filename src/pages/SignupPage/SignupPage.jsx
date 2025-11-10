import SignupForm from "../../components/Forms/SignupForm/SignupForm.jsx";
import classes from '../LoginPage/LoginPage.module.css'

function SignupPage() {
    return (
        <main className={classes['login-page']}>
            <p>Bienvenue sur</p>
            <h1>LocalLoop !</h1>
            <p>Explorer ce qui se cache autour de vous</p>
            <div>
                <SignupForm />
                <p><a href="">Se connecter</a></p>
            </div>
        </main>
    )
}

export default SignupPage;