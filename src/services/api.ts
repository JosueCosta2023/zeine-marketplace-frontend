import axios from "axios";


const api = axios.create({
    baseURL: "https://zeine-marketplace-api.vercel.app/api",
})


export default api