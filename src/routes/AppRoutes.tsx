import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import ProductsListPage from "../features/auth/pages/ProductsListPage"
import ProductsFormPage from "../features/auth/pages/ProductsFormPage"
import PageNotFound from "../features/commun/pages/PageNotFound"
import RegisterUserPage from "../features/auth/pages/RegisterUserPage"

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterUserPage/>}/>
                <Route path="/Products" element={<ProductsListPage/>}/>
                <Route path="/Products/register" element={<ProductsFormPage/>}/>
                <Route path="/Products/:id/edit" element={<ProductsFormPage/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes