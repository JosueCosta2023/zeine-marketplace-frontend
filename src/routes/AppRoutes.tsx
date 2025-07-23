import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ProductsListPage from "../features/auth/pages/ProductsListPage";
import PageNotFound from "../features/commun/pages/PageNotFound";
import AdministratorPage from "../features/auth/pages/AdministratorPage";
import HeartLayout from "../layout/HeaderLayout";
import ProductDetailPage from "../features/auth/pages/ProductDetailPage";
import RegistrationUserPage from "../features/auth/pages/RegistrationUserPage";
import RegistrationProductPage from "../features/auth/pages/RegistrationProductPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationUserPage />} />

    {/* Rotas aninhadas, rota pai PRODUCTS */}
        <Route element={<HeartLayout/>}>
          <Route path="/admin" element={<AdministratorPage />} /> 
          <Route path="/products">
            <Route index element={<ProductsListPage />} />
            <Route path="register" element={<RegistrationProductPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
