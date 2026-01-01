import ForgotPasswordForm from "../../../components/Forms/PasswordForms/ForgotPasswordForm.jsx";
import classes from "../Password.module.css";

function ForgotPasswordPage() {
    return (
        <main className={classes['forgot-password-page']}>
            <h1>Mot de passe oublié</h1>

            <div>
                <ForgotPasswordForm/>
            </div>
        </main>
    )
}

export default ForgotPasswordPage;
