import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useState} from "react";
import {NavLink} from "react-router-dom";

function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ email, password });
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

            <NavLink to="/forgot-password">
                <span>Mot de passe oublié</span>
            </NavLink>
            <Button type="submit" className={'small-blue-btn'}>Connexion</Button>
        </form>
    );
}

export default LoginForm;