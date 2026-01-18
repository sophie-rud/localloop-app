import classes from './Footer.module.css';
import {NavLink} from "react-router-dom";

function Footer() {
    return (
        <footer className={classes.footer}>
            <ul>
                {/*<li>Contact</li>*/}
                <li>
                    <NavLink to={'/legal-notices'} className={classes['footer-link']} >
                        Mentions légales
                    </NavLink>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;
