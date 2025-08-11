import type { ProductFormValues } from "../types/globalTypes";
import api from "./api"



export const getProducts = async () => {
    try {
        const response = await api.get("/product");
        return response
        
    } catch (error) {   
        throw new Error(`Falha ao carregar produtos. ${error}`)
    }
}


export const getProductById = async (id: string) => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data.result
        
    } catch (error) {
        throw new Error(`Falha ao carregar produto: ${error}`)
    }
}

export const createProduct = async (data: ProductFormValues) => {
    try {
        console.log("dados do formulario", data)
        const response = await api.post("/product", data)
        return response.data
        
    } catch (error) {
        throw new Error(`Falha ao cadastrar produtos: ${error}`)
    }
}
export const updateProduct = async (id: string, data: ProductFormValues) => {
    try {
        const response = await api.patch(`/product/${id}`, data);
        return response.data
        
    } catch (error) {
        throw new Error(`Falha ao atualizar produtos: ${error}`)
    }
}
export const deleteProduct = async (id: string) => {
    try {
        const response = await api.delete(`/product/${id}`)
        return response.data
        
    } catch (error) {
        throw new Error(`Falha ao deletar produtos: ${error}`)
    }
}