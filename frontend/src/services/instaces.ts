import axios from "axios"
const BASE_API_URL = import.meta.env.VITE_API_URL

export const mainApiInstance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true
})