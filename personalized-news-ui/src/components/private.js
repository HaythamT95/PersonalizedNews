import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const user = localStorage.getItem('userData')

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;