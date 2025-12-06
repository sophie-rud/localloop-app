import Navbar from '../../components/layout/Navbar/Navbar.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx';
import Header from '../../components/layout/Header/Header.jsx';
import {Outlet} from 'react-router-dom'

function MainLayout({ searchTerm, onSearch }) {
    return (
        <>
            <Header onSearch={onSearch} />
            <Navbar/>
            <Outlet context={{searchTerm}} />
            <Footer/>
        </>
    )
}

export default MainLayout;