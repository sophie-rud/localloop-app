import classes from './Navbar.module.css';
import {NavLink, useParams} from 'react-router-dom';
import { Map, Grid2x2, Heart, CircleUserRound } from 'lucide-react';

function Navbar() {
    const { id } = useParams();

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
                    <NavLink to={`/user/${id}/tracks/favorites`} >
                        <Heart className={classes['nav-icon']}/>
                    </NavLink>
                </li>
                <li className={classes['nav-item']}>
                    <NavLink to={`/user/${id}/profile`}>
                        <CircleUserRound className={classes['nav-icon']}/>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;