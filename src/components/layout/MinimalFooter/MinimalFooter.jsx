import {NavLink} from "react-router-dom";
import classes from './MinimalFooter.module.css';

function MinimalFooter() {
    return (
        <footer className={classes['minimal-footer']}>
            <NavLink to={'/legal-notices'} className={classes['footer-link']} >
                Mentions légales
            </NavLink>
        </footer>
    )
}

export default MinimalFooter;
