import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { Map, Grid2x2, Heart, CircleUserRound } from 'lucide-react';


function Navbar() {
    return (
        <nav className={classes.navbar}>
            <ul className={classes['nav-items']}>
                <li className={classes['nav-items li']}>
                    <NavLink to="/">
                        <Map className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-items li']}>
                    <NavLink to="/">
                        <Grid2x2 className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-items li']}>
                    <NavLink to="/">
                        <Heart className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-items li']}>
                    <NavLink to="/">
                        <CircleUserRound className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                {/*<li className={classes['nav-links li']}>*/}
                {/*    {isLogin && <NavLink to="/profil">Profil</NavLink>}*/}
                {/*</li>*/}
            </ul>
        </nav>
    )
}

export default Navbar;