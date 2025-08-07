import api from "./api";

export const getCategories = async () => {
    const response = await api.get("/category");
    return response.data
}

export const getCategoryById = async (id: string) => {
    const response = await api.get(`/category/${id}`)
    return response.data
}