
import type { JSX } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}: {children: JSX.Element}) => {
    const {user} = useAuth();
    return user ? children : <Navigate to="/login"/>  
}

export default PrivateRoutes