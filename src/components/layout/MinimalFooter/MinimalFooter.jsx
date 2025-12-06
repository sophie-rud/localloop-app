import {Link} from "react-router-dom";
import classes from './MinimalFooter.module.css';

function MinimalFooter() {
    return (
        <footer className={classes['minimal-footer']}>
                <Link to="/mentions-legales">Mentions légales</Link>
        </footer>
    )
}

export default MinimalFooter;
