import {NavLink} from "react-router-dom";
import classes from "./PageNotFound.module.css";

function PageNotFound() {
    return (
        <main className={classes['not-found-container']}>
            <h1 className={classes['not-found-title']}>404</h1>
            <p className={classes['not-found-text']}>
                La page que vous cherchez n’existe plus :(
            </p>
            <NavLink to="/" className={classes['home-link']}>
               - Retourner à l’accueil -
            </NavLink>
        </main>
    );
}

export default PageNotFound;
