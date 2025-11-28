import Navbar from '../elements/Navbar/Navbar.jsx';
import Footer from '../elements/Footer/Footer.jsx';
import Header from '../elements/Header/Header.jsx';
import {Outlet} from 'react-router-dom'

function MainLayout({ searchTerm, onSearch }) {
    return (
        <>
            <Header onSearch={onSearch} />
            <Outlet context={{searchTerm}} />
            <Footer/>
            <Navbar/>
        </>
    )
}

export default MainLayout;