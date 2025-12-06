import { Outlet } from 'react-router-dom'
import MinimalFooter from "../../components/layout/MinimalFooter/MinimalFooter.jsx";
import MinimalHeader from "../../components/layout/MinimalHeader/MinimalHeader.jsx";

function MinimalLayout() {
    return (
        <>
            <MinimalHeader />
            <Outlet/>
            <MinimalFooter />
        </>
    )
}

export default MinimalLayout;