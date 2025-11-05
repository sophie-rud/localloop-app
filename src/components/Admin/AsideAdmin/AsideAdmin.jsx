import classes from './AsideAdmin.module.css';
import photo from "../../../assets/images/image-colmar.jpg";
import { Users, Grid2x2, MapPin, LocateFixed } from 'lucide-react';
import {NavLink} from "react-router-dom";

function AsideAdmin() {
    return (
        <aside className={classes['sidebar']}>
            <div className={classes['sidebar-header']}>
                <div className={classes['sidebar-avatar']}>
                    <img
                        src={photo}
                        alt="Avatar"
                        className={classes['image']}
                    />
                </div>
                <div className={classes['welcome']}>
                    <p>Bienvenue,</p>
                    <span>Admin</span>
                </div>
            </div>

            <h1 className={classes['sidebar-title']}>Tableau de bord</h1>

            <div className={classes['sidebar-menu']}>
                <h2 className={classes['sidebar-subtitle']}>Mon profil</h2>
                <NavLink to="" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    Mes infos
                </NavLink>
                <NavLink to="" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    Mes parcours
                </NavLink>
            </div>

            <div className={classes['sidebar-menu']}>
                <h2 className={classes['sidebar-subtitle']}>Dashboards</h2>
                <NavLink to="" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <Users className={classes.icon} /> Utilisateurs
                </NavLink>
                <NavLink to="" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <Grid2x2 className={classes.icon} /> Parcours
                </NavLink>
                <NavLink to="" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <MapPin className={classes.icon} /> Étapes
                </NavLink>
            </div>

            <div className={classes['sidebar-menu']}>
                <h2 className={classes['sidebar-subtitle']}>Gestion des lieux</h2>
                <NavLink to="" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    Voir les lieux
                </NavLink>
                <NavLink to="" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <LocateFixed className={classes.icon} /> Dashboard
                </NavLink>
            </div>

            <div className={classes['sidebar-footer']}>
                <p>logo</p>
                <p>LocalLoop</p>
            </div>
        </aside>
    )
}

export default AsideAdmin;