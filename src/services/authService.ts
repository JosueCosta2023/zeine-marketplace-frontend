import api from "./api";
import type {LoginPayload, LoginResponse} from "../types/globalTypes";


export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const response  = await api.post("/users/login", payload)

    console.log("login rais", response.data.result)
    return response.data.result
}