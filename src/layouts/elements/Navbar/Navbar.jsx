import classes from './Navbar.module.css';
import {NavLink, useParams} from 'react-router-dom';
import { Map, Grid2x2, Heart, CircleUserRound } from 'lucide-react';

function Navbar() {
    const { id } = useParams();

    return (
        <nav className={classes.navbar}>
            <ul className={classes['nav-items']}>
                <li className={classes['nav-item']}>
                    <NavLink to="/map"
                             className={({ isActive }) => isActive ? `${classes['nav-link']} ${classes.active}` : classes['nav-link']}>
                        <Map className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-item']}>
                    <NavLink to="/tracks"
                             className={({ isActive }) => isActive ? `${classes['nav-link']} ${classes.active}` : classes['nav-link']}>
                        <Grid2x2 className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-item']}>
                    <NavLink to={`/user/${id}/tracks/favorites`}
                             className={({ isActive }) => isActive ? `${classes['nav-link']} ${classes.active}` : classes['nav-link']}>
                        <Heart className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-item']}>
                    <NavLink to={`/user/${id}/profile`}
                             className={({ isActive }) => isActive ? `${classes['nav-link']} ${classes.active}` : classes['nav-link']}>
                        <CircleUserRound className={classes['nav-icon']}/>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;