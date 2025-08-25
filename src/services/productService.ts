import type { ProductFilters, ProductFormValues } from "../types/globalTypes";
import api from "./api";

export const fetchProduct = async (filters: ProductFilters = {}) => {
  try {
    if (filters.categoryName || filters.status || filters.categoryId) {
      const queryParams = new URLSearchParams();

      if (filters.categoryId)
        queryParams.append("categoryId", filters.categoryId);
      if (filters.categoryName)
        queryParams.append("categoryName", filters.categoryName);
      if (filters.status) queryParams.append("status", filters.status);

      const response = await api.get(`/product/filter?${queryParams.toString()}
    `)
    return response.data
    }

    const response = await api.get(`/porduct`);
    return response.data


  } catch (error) {
    throw new Error(`Erro ao carregar produto(s): ${error}`);
  }
};


export const getProducts = async () => {
    try {
        const response = await api.get(`/product`)
        return response.data
    } catch (error) {
        throw new Error(`Erro ao carregar produtos: ${error}`)
    }
}
export const getProductById = async (id: string) => {
    try {
        const response = await api.get(`/product/${id}`)
        return response.data.result
    } catch (error) {
        throw new Error(`Erro ao carregar produtos: ${error}`)
    }
}

export const createProduct = async (data: ProductFormValues) => {
  try {
    console.log("dados do formulario", data);
    const response = await api.post("/product", data);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao cadastrar produtos: ${error}`);
  }
};
export const updateProduct = async (id: string, data: ProductFormValues) => {
  try {
    const response = await api.patch(`/product/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao atualizar produtos: ${error}`);
  }
};
export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Falha ao deletar produtos: ${error}`);
  }
};
