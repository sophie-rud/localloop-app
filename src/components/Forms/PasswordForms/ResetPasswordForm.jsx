import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getRequest, postRequest} from "../../../services/request.jsx";
import formClasses from "../Forms.module.css";
import Button from "../../ui/Button/Button.jsx";
import classes from "../../../pages/Home/Home.module.css";

function ResetPasswordForm() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);

    // Check token validity on loading
    useEffect(() => {
        const verifyToken = async () => {
            try {
                await getRequest(`/reset-password/${token}`);
                setTokenValid(true);
            } catch (error) {
                console.error(error);
                setError('Ce lien est invalide ou a expiré.');
            }
        };
        verifyToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);

        try {
            const response = await postRequest(`/reset-password/${token}`, { password });
            setMessage(response.message);

            // Redirect to the login page after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            setError(error?.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    if (!tokenValid && !error) {
        return <div>Vérification du lien...</div>;
    }

    if (error && !tokenValid) {
        return (
            <div className={classes['reset-password-container']}>
                <h2>Erreur</h2>
                <p className={formClasses['error']}>{error}</p>
                <Button type="button" className={'small-blue-btn'} onClick={() => navigate('/forgot-password')}>
                    Demander un nouveau lien
                </Button>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={formClasses['form']}>
                    <label htmlFor="password">Nouveau mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={formClasses['common-input']}
                        placeholder="Nouveau mot de passe"
                        required
                        disabled={loading}
                    />

                    <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={formClasses['common-input']}
                        placeholder="Confirmer le mot de passe"
                        required
                        disabled={loading}
                    />

                <Button type="submit" className={'small-blue-btn'} disabled={loading}>
                    {loading ? 'Enregistrement...' : 'Réinitialiser le mot de passe'}
                </Button>
            </form>

            {error && <p className={formClasses['error']}>{error}</p>}
            {message && <p>{message}</p>}
        </>
    );
}

export default ResetPasswordForm;