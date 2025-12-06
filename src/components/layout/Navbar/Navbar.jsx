import classes from './Navbar.module.css';
import {NavLink, useParams} from 'react-router-dom';
import { Map, Grid2x2, Heart, CircleUserRound } from 'lucide-react';

function Navbar() {
    const { id } = useParams();

    return (
        <>
            <nav className={classes['navbar-mobile']}>
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

            <nav className={classes['navbar-desktop']}>
                <ul className={classes['nav-items-desktop']}>
                    <li className={classes['nav-item-desktop']}>
                        <NavLink to="/map"
                                 className={({ isActive }) => isActive ? `${classes['nav-link-desktop']} ${classes.active}` : classes['nav-link-desktop']}>
                            <div className={classes['nav-icon-desktop']}><Map /></div>
                            <p>Carte</p>
                        </NavLink>
                    </li>
                    <li className={classes['nav-item-desktop']}>
                        <NavLink to="/tracks"
                                 className={({ isActive }) => isActive ? `${classes['nav-link-desktop']} ${classes.active}` : classes['nav-link-desktop']}>
                            <div className={classes['nav-icon-desktop']}><Grid2x2 /></div>
                            <p>Parcours</p>
                        </NavLink>
                    </li>
                    <li className={classes['nav-item-desktop']}>
                        <NavLink to={`/user/${id}/tracks/favorites`}
                                 className={({ isActive }) => isActive ? `${classes['nav-link-desktop']} ${classes.active}` : classes['nav-link-desktop']}>
                            <div className={classes['nav-icon-desktop']}><Heart /></div>
                            <p>Favoris</p>
                        </NavLink>
                    </li>
                    <li className={classes['nav-item-desktop']}>
                        <NavLink to={`/user/${id}/profile`}
                                 className={({ isActive }) => isActive ? `${classes['nav-link-desktop']} ${classes.active}` : classes['nav-link-desktop']}>
                            <div  className={classes['nav-icon-desktop']}><CircleUserRound /></div>
                            <p>Profil</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;