import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ProductsListPage from "../features/auth/pages/ProductsListPage";
import ProductsFormPage from "../features/auth/pages/ProductsFormPage";
import PageNotFound from "../features/commun/pages/PageNotFound";
import RegisterUserPage from "../features/auth/pages/RegisterUserPage";
import AdministratorPage from "../features/auth/pages/AdministratorPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdministratorPage />} />
        <Route path="/register" element={<RegisterUserPage />} />

    {/* Rotas aninhadas, rota pai PRODUCTS */}
        <Route path="/products">
          <Route index element={<ProductsListPage />} />
          <Route path="register" element={<ProductsFormPage />} />
          <Route path=":id/edit" element={<ProductsFormPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
