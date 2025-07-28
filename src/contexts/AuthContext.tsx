import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextProps, LoginResponse } from "../types/globalTypes";
import { login as loginService } from "../services/authService";
import { removeLocalStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // Recupera usuário e token do localStorage ao iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
    }

    setLoading(false)
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
    } catch (error) {
      console.error("Erro ao efetura o login", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/login")
    removeLocalStorage()
}

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );

};




export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
