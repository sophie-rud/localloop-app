import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { Map, Grid2x2, Heart, CircleUserRound } from 'lucide-react';


function Navbar() {
    return (
        <nav className={classes.navbar}>
            <ul className={classes['nav-items']}>
                <li className={classes['nav-item']}>
                    <NavLink to="/map">
                        <Map className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-item']}>
                    <NavLink to="/tracks">
                        <Grid2x2 className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-item']}>
                    <NavLink to="/">
                        <Heart className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-item']}>
                    <NavLink to="/user/profile">
                        <CircleUserRound className={classes['nav-icon']}/>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;