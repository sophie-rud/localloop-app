import classes from './AsideAdmin.module.css';
import photo from "../../../assets/images/image-colmar.jpg";
import {Users, Grid2x2, LocateFixed, Eye, ContactRound, LogOut} from 'lucide-react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import logo from "../../../assets/images/logo_localloop_green.png";
import Button from "../../ui/Button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/auth-context.jsx";

function AsideAdmin() {

    const { isLogin, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

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
                <NavLink to="/admin/:id/profile" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <ContactRound className={classes.icon} /> Mes infos & mes parcours
                </NavLink>
            </div>

            <div className={classes['sidebar-menu']}>
                <h2 className={classes['sidebar-subtitle']}>Dashboards</h2>
                <NavLink to="/admin/:id/usersDashboard" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <Users className={classes.icon} /> Utilisateurs
                </NavLink>
                <NavLink to="/admin/:id/tracksDashboard" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <Grid2x2 className={classes.icon} /> Parcours
                </NavLink>
                {/*<NavLink to="/admin/:id/steps" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>*/}
                {/*    <MapPin className={classes.icon} /> Étapes*/}
                {/*</NavLink>*/}
            </div>

            <div className={classes['sidebar-menu']}>
                <h2 className={classes['sidebar-subtitle']}>Gestion des lieux</h2>
                <NavLink to="/admin/:id/places" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <Eye className={classes.icon} /> Voir les lieux
                </NavLink>
                <NavLink to="/admin/:id/placesDashboard" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>
                    <LocateFixed className={classes.icon} /> Dashboard
                </NavLink>
            </div>

            <div className={classes['sidebar-footer']}>
                <div>
                    {isLogin && (
                        <Button type="button" className={'logout-button'} onClick={handleLogout} title="Se déconnecter">
                            <LogOut />
                        </Button>
                    )}
                </div>
                <Link to="/admin/:id/profile">
                    <div className={classes.logo}>
                        <img src={logo} alt="logo" />
                    </div>
                </Link>
            </div>
        </aside>
    )
}

export default AsideAdmin;