import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ProductsListPage from "../features/auth/pages/ProductsListPage";
import PageNotFound from "../features/commun/pages/PageNotFound";
import RegisterUserPage from "../features/auth/pages/RegisterUserPage";
import AdministratorPage from "../features/auth/pages/AdministratorPage";
import HeartLayout from "../layout/HeaderLayout";
import ProductsRegisterPage from "../features/auth/pages/ProductsRegisterPage";
import ProductDetailPage from "../features/auth/pages/ProductDetailPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUserPage />} />

    {/* Rotas aninhadas, rota pai PRODUCTS */}
        <Route element={<HeartLayout/>}>
          <Route path="/admin" element={<AdministratorPage />} /> 
          <Route path="/products">
            <Route index element={<ProductsListPage />} />
            <Route path="register" element={<ProductsRegisterPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
