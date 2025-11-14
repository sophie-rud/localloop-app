import SignupForm from "../../../components/Forms/SignupForm/SignupForm.jsx";
import classes from '../SignupAndLoginPage.module.css';
import {Link} from "react-router-dom";

function SignupPage() {
    return (
        <main className={classes['signup-page']}>
            <p>Bienvenue sur</p>
            <h1>LocalLoop !</h1>
            <p>Explorer ce qui se cache autour de vous</p>
            <div>
                <SignupForm />
                <Link to="/login">
                    <span>Se connecter</span>
                </Link>
            </div>
        </main>
    )
}

export default SignupPage;