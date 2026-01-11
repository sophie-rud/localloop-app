import formClasses from '../Forms.module.css';
import Button from '../../ui/Button/Button.jsx';
import {useState} from "react";
import {hasErrors, validateForm, validators} from "../../../utils/validators.js";

function SignupForm({ onSubmit }) {
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const validationRules = {
        email: validators.email,
        username: validators.username,
        password: validators.password,
        confirmPassword: validators.confirmPassword(formData.password),
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const formErrors = validateForm(formData, validationRules);
        setErrors(formErrors);

        if(hasErrors(formErrors)) {
            return;
        }

        onSubmit({
            email: formData.email,
            username: formData.username,
            password: formData.password,
        });
    };

    return (
        <form onSubmit={handleSubmit} className={formClasses['signup-form']}>

            <div className={formClasses['input-container']}>
                {errors.username && <p className={formClasses['error']}>{errors.username}</p>}
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
            </div>

            <div className={formClasses['input-container']}>
                {errors.email && <p className={formClasses['error']}>{errors.email}</p>}
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
            </div>

            <div className={formClasses['input-container']}>
                {errors.password && <p className={formClasses['error']}>{errors.password}</p>}
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
            </div>

            <div className={formClasses['input-container']}>
                {errors.confirmPassword && <p className={formClasses['error']}>{errors.confirmPassword}</p>}
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Mot de passe"
                    value={formData.confirmPassword}
                    className={formClasses['common-input']}
                    onChange={handleChange('confirmPassword')}
                    required
                />
            </div>

            <Button type="submit" className={'small-blue-btn'}>S'inscrire</Button>
        </form>
    );
}

export default SignupForm;