import classes from './MinimalHeader.module.css';
import {Link} from "react-router-dom";
import logo from "../../../assets/images/logo_localloop.png";

function MinimalHeader() {
    return (
        <header className={classes['minimal-header']}>
            <Link to="/">
                <div className={classes.logo}>
                    <img src={logo} alt="logo" />
                </div>
            </Link>
        </header>
    )
}

export default MinimalHeader;
