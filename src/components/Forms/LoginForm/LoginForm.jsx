import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/auth-context.jsx";
import {postRequest} from "../../../services/request.jsx";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await postRequest("/login", { email, password });
        const userData = response.user;

        login(userData);

        if (userData.roleId === 2) {
            navigate('/admin/profile');
        } else if (userData.roleId === 1) {
            navigate('/user/profile');
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
                required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={formClasses['common-input']}
                required
            />

            <Link to="">
                <p>Mot de passe oublié</p>
            </Link>
            <Button type="submit" className={'small-blue-btn'}>Connexion</Button>
        </form>
    );
}

export default LoginForm;