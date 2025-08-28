import type { UserFormsValues } from "../types/globalTypes";
import api from "./api";

export const updateUser = async (id: string, userData: any) => {
  try {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Erro na requisição:");
    console.error("❌ Status:", error.response?.status);
    console.error("❌ Data:", JSON.stringify(error.response?.data, null, 2));
    throw new Error(
      `Erro ao atualizar usuário: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};



export const createdUser = async (data: UserFormsValues) => {
  try {
    const response = await api.post(`/users`, data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Erro na requisição:");
    console.error("❌ Status: ", error.response?.status);
    console.error("❌ Data: ", JSON.stringify(error.response.data, null, 2));
    throw new Error(`Erro ao criar usuario: ${error.response?.data}`);
  }
};
