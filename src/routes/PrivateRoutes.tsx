
import type { JSX } from "react";
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";
import DelayedLoading from "../components/DelayedLoading";

const PrivateRoutes = ({children}: {children: JSX.Element}) => {
    const {user, loading} = useAuth();
    if(loading) return(<DelayedLoading loading={loading} minShow={2000} delay={300}><div className=" text-primary">Carregando produtos...</div></DelayedLoading>)
    return user ? children : <Navigate to="/login"/>  
}

export default PrivateRoutes