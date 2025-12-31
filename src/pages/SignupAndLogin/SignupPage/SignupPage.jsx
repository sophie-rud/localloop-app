import SignupForm from "../../../components/Forms/SignupForm/SignupForm.jsx";
import classes from '../SignupAndLoginPage.module.css';
import {Link, useNavigate} from "react-router-dom";
import useUsersStore from "../../../stores/useUsersStore.jsx";
import {useState} from "react";

function SignupPage() {
    const navigate = useNavigate();
    const { signup, loading, error } = useUsersStore();
    const [errors, setErrors] = useState({});

    const handleSignup = async (data) => {
        const newErrors = {};

        if (!data.email) newErrors.email = "Email obligatoire";
        if (!data.username) newErrors.username = "Pseudo obligatoire";
        if (!data.password) newErrors.password = "Mot de passe obligatoire";
        if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

        if (Object.keys(newErrors).length > 0) {
            return setErrors(newErrors);
        }

        const newUser = {
            email: data.email,
            password: data.password,
            username: data.username,
            avatar: null,
        }

        try {
            await signup(newUser);
            navigate("/login");
        } catch(error) {
            setErrors({ erreur: error.message });
        }

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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <SignupForm
                    onSubmit={handleSignup}
                    errors={errors}
                />
                <Link to="/login">
                    <span>Se connecter</span>
                </Link>
            </div>
        </main>
    )
}

export default SignupPage;