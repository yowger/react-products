import axios from "axios"

import { config } from "@/lib/config"

const publicAxios = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: config.VITE_API_URL,
})

export default publicAxios
