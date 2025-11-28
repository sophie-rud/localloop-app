import classes from './Header.module.css';
import SearchBar from "../SearchBar/SearchBar.jsx";
import {Link, useNavigate} from 'react-router-dom';
import logo from "../../../assets/images/logo_localloop.png";
import { LogOut } from 'lucide-react';
import {useContext} from "react";
import {AuthContext} from "../../../contexts/auth-context.jsx";
import Button from "../../../components/Button/Button.jsx";

function Header({ onSearch }) {

    const { isLogin, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className={classes.header}>
            <Link to="/">
                <div className={classes.logo}>
                    <img src={logo} alt="logo" />
                </div>
            </Link>
            <SearchBar
                className={'search-bar-user'}
                onSearch={onSearch}
            />
            <div>
                {isLogin && (
                    <Button type="button" className={'logout-button'} onClick={handleLogout} title="Se déconnecter">
                        <LogOut />
                    </Button>
                )}
            </div>

        </header>
    )
}

export default Header;