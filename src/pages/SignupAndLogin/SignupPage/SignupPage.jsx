import SignupForm from "../../../components/Forms/SignupForm/SignupForm.jsx";
import classes from '../SignupAndLoginPage.module.css';
import {Link, useNavigate} from "react-router-dom";
import useUsersStore from "../../../stores/useUsersStore.jsx";

function SignupPage() {
    const navigate = useNavigate();
    const { addUser, loading, error } = useUsersStore();

    const handleSignup = async (data) => {
        if (data.password !== data.confirmedPassword) {
            alert ("Les mots de passe ne correspondent pas");
        }
        if (!data.email || !data.username || !data.password || !data.confirmedPassword) {
            alert("Tous les champs doivent être complétés");
        }

        const newUser = {
            email: data.email,
            password: data.password,
            username: data.username,
            avatar: null,
        }

        await addUser(newUser);
        navigate("/login");
    }

    return (
        <main className={classes['signup-page']}>
            <p>Bienvenue sur</p>
            <h1>LocalLoop !</h1>
            <p>Explorer ce qui se cache autour de vous</p>
            <div>
                {loading && <p>Création du compte…</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <SignupForm onSubmit={handleSignup} />
                <Link to="/login">
                    <span>Se connecter</span>
                </Link>
            </div>
        </main>
    )
}

export default SignupPage;