import classes from './Header.module.css';
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/logo_localloop.png";

function Header() {
    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>
                    <img src={logo} alt="logo" />
                </div>
            </Link>
            <SearchBar className={'search-bar-user'}/>
        </header>
    )
}

export default Header;