import formClasses from '../Forms.module.css';
import Button from '../../Button/Button.jsx';
import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/auth-context.jsx";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("user");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(role);
        if (role === "admin") {
            navigate("/admin/1/profile");
        } else {
            navigate("/user/2/profile");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['login-form']}>

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className={formClasses['common-input']}
                // required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={formClasses['common-input']}
                // required
            />

            <label htmlFor="role">Role</label>
            <select
                value={role}
                className={formClasses['common-select-input']}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
            </select>

            <Link to="">
                <p>Mot de passe oublié</p>
            </Link>
            <Button type="submit" className={'small-blue-btn'}>Connexion</Button>
        </form>
    );
}

export default LoginForm;