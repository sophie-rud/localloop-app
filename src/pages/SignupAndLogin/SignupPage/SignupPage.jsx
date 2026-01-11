import SignupForm from "../../../components/Forms/SignupForm/SignupForm.jsx";
import classes from '../SignupAndLoginPage.module.css';
import {Link, useNavigate} from "react-router-dom";
import useUsersStore from "../../../stores/useUsersStore.jsx";

function SignupPage() {
    const navigate = useNavigate();
    const { signup, loading, error } = useUsersStore();

    const handleSignup = async (data) => {
            await signup(data);
            navigate("/login");
    }

    return (
        <main className={classes['signup-page']}>
            <div className='title-block'>
                <p>Bienvenue sur</p>
                <h1>LocalLoop !</h1>
                <p>Explorer ce qui se cache autour de vous</p>
            </div>
            <div>
                {loading && <p>Création du compte…</p>}
                {error && <p className='error'>{error}</p>}
                <SignupForm
                    onSubmit={handleSignup}
                />
                <Link to="/login">
                    <span>Se connecter</span>
                </Link>
            </div>
        </main>
    )
}

export default SignupPage;