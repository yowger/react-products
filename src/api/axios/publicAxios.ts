import axios from "axios"

import { config } from "@/lib/config"

const publicAxios = axios.create({
    baseURL: config.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

publicAxios.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)

export default publicAxios
