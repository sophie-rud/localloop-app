import classes from './Header.module.css';
import { Search } from 'lucide-react'

function Header() {
    return (
        <header className={classes.header}>
            <div>logo</div>
            <div className={classes['search-bar']}>
                <input
                    type="text"
                    id="search-input"
                    placeholder="Rechercher..."
                    className={classes['search-input']}
                />
                <button className={classes['search-button']}>
                    < Search />
                </button>
            </div>
        </header>
    )
}

export default Header;