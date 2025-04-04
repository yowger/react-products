import axios from "axios"

import { config } from "@/lib/config"

const publicAxios = axios.create({
    baseURL: config.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        apiKey: config.VITE_API_KEY,
    },
})

export default publicAxios
