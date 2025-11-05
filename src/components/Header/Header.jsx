import classes from './Header.module.css';
import SearchBar from "../SearchBar/SearchBar.jsx";

function Header() {
    return (
        <header className={classes.header}>
            <div>logo</div>
            <SearchBar className={'search-bar-user'}/>
        </header>
    )
}

export default Header;