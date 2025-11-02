// import classes from './LoginForm.module.css';
import formClasses from '../Forms.module.css';
import Button from '../../Button/Button.jsx';
import {useState} from "react";

function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['login-form']}>
            <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className={formClasses['common-input']}
                required
            />
            <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={formClasses['common-input']}
                required
            />
            <p><a href="">Mot de passe oublié</a></p>
            <Button type="submit" className={'blue-btn'}>Connexion</Button>
        </form>
    );
}

export default LoginForm;