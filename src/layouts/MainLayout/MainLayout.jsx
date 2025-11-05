import Navbar from '../elements/Navbar/Navbar.jsx';
import Footer from '../elements/Footer/Footer.jsx';
import Header from '../elements/Header/Header.jsx';
import { Outlet } from 'react-router-dom'
import Home from "../../pages/Home/Home.jsx";

function MainLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Home/>
            <Footer/>
            <Navbar/>
        </>
    )
}

export default MainLayout;