import { Outlet } from 'react-router-dom'
import MinimalFooter from "../elements/MinimalFooter/MinimalFooter.jsx";
import MinimalHeader from "../elements/MinimalHeader/MinimalHeader.jsx";

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