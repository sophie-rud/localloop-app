import ResetPasswordForm from "../../../components/Forms/PasswordForms/ResetPasswordForm.jsx";
import classes from "../Password.module.css";

function ResetPasswordPage() {
   return (
       <main className={classes['reset-password-page']}>
           <h1>Nouveau mot de passe</h1>
           <div>
               <ResetPasswordForm/>
           </div>
       </main>
   )
}

export default ResetPasswordPage;
