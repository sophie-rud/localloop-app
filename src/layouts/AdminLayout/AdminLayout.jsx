import {Outlet} from "react-router-dom";
import AsideAdmin from "../../components/Admin/AsideAdmin/AsideAdmin.jsx";

function AdminLayout() {
    return (
        <>
            <AsideAdmin/>
            <Outlet/>
        </>
    )
}

export default AdminLayout;