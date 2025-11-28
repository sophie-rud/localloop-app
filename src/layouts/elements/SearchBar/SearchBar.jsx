import classes from "./SearchBar.module.css";
import {Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function SearchBar() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = searchValue.trim();

        if (query) {
            navigate(`/tracks?query=${encodeURIComponent(query)}`);
        }
    }

    return (
            <form onSubmit={handleSubmit} className={classes['search-bar-user']} >
                <input
                    type="text"
                    id="search-input"
                    placeholder="Rechercher..."
                    className={classes['search-input']}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className={classes['search-button']}>
                    < Search />
                </button>
            </form>
    )
}

export default SearchBar;
