import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ProductsListPage from "../features/auth/pages/ProductsListPage";
import PageNotFound from "../features/commun/pages/PageNotFound";
import AdministratorPage from "../features/auth/pages/AdministratorPage";
import HeartLayout from "../layout/HeaderLayout";
import ProductDetailPage from "../features/auth/pages/ProductDetailPage";
import RegistrationUserPage from "../features/auth/pages/RegistrationUserPage";
import RegistrationProductPage from "../features/auth/pages/RegistrationProductPage";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import PerfilUserPage from "../features/auth/pages/PerfilUserPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationUserPage />} />

          {/* Rotas aninhadas, rota pai PRODUCTS */}
          <Route element={<HeartLayout />}>
            <Route
              path="/admin"
              element={
                <PrivateRoutes>
                  <AdministratorPage />
                </PrivateRoutes>
              }
            />
            <Route path="/products">
              <Route
                index
                element={
                  <PrivateRoutes>
                    <ProductsListPage />
                  </PrivateRoutes>
                }
              />
              <Route
                path="register"
                element={
                  <PrivateRoutes>
                    <RegistrationProductPage />
                  </PrivateRoutes>
                }
              />
              <Route
                path=":id"
                element={
                  <PrivateRoutes>
                    <ProductDetailPage />
                  </PrivateRoutes>
                }
              />
            </Route>

            <Route path="/user" element={
              <PrivateRoutes>
                <PerfilUserPage/>
              </PrivateRoutes>
            }>

            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
