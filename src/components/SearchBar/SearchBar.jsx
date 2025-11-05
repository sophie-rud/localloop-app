import classes from "./SearchBar.module.css";
import {Search} from "lucide-react";

function SearchBar({ className = '' }) {
    return (
        <div className={classes[className] || ''}>
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
    )
}

export default SearchBar;
