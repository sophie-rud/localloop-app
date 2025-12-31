import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useState} from "react";

function SignupForm({ onSubmit, errors }) {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['signup-form']}>

            <label htmlFor="username">Pseudo</label>
            <input
                type="text"
                id="username"
                value={formData.username}
                placeholder="Pseudo"
                className={formClasses['common-input']}
                onChange={handleChange('username')}
                required
            />
            {errors.username && <p className={formClasses['error']}>{errors.username}</p>}


            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={formData.email}
                placeholder="Email"
                className={formClasses['common-input']}
                onChange={handleChange('email')}
                required
            />
            {errors.email && <p className={formClasses['error']}>{errors.email}</p>}

            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                id="password"
                value={formData.password}
                placeholder="Mot de passe"
                className={formClasses['common-input']}
                onChange={handleChange('password')}
                required
            />
            {errors.password && <p className={formClasses['error']}>{errors.password}</p>}

            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                className={formClasses['common-input']}
                onChange={handleChange('confirmPassword')}
                required
            />
            {errors.confirmPassword && <p className={formClasses['error']}>{errors.confirmPassword}</p>}

            <Button type="submit" className={'small-blue-btn'}>S'inscrire</Button>
        </form>
    );
}

export default SignupForm;