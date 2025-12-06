// import classes from './SignupForm.module.css';
import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useState} from "react";

function SignupForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, email, password, isActive: true });
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['signup-form']}>
            <input
                type="text"
                id="username"
                value={username}
                placeholder="Pseudo"
                className={formClasses['common-input']}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                className={formClasses['common-input']}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                id="password"
                value={password}
                placeholder="Mot de passe"
                className={formClasses['common-input']}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                id="confirmPassword"
                value={confirmedPassword}
                placeholder="Confirmer le mot de passe"
                className={formClasses['common-input']}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                required
            />
            <Button type="submit" className={'small-blue-btn'}>S'inscrire</Button>
        </form>
    );
}

export default SignupForm;