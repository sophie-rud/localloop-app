import { useState } from 'react';
import {postRequest} from "../../../services/request.jsx";
import formClasses from "../Forms.module.css";
import Button from "../../ui/Button/Button.jsx";

function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await postRequest('/forgot-password', { email });
            setMessage(response.message);
            setEmail('');
        } catch (error) {
            console.error('Erreur :', error);
            setMessage(error.message || 'Une erreur est survenue. Réessayez plus tard.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={formClasses['form']}>
                <div className={formClasses['display-row']}>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={formClasses['common-input']}
                        placeholder="Votre email"
                        required
                        disabled={loading}
                    />
                </div>

                <Button type="submit" className={'small-blue-btn'} disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </Button>
            </form>

            {message && <p>{message}</p>}
        </>
    );
}

export default ForgotPasswordForm;