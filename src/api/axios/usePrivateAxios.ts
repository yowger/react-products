import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { toast } from "sonner"

import { config } from "@/lib/config"

export function usePrivateAxios() {
    const { getAccessTokenSilently, logout } = useAuth0()

    const privateAxios = axios.create({
        baseURL: config.VITE_API_URL,
        headers: {
            "Content-Type": "application/json",
            apiKey: config.VITE_API_KEY,
        },
    })

    privateAxios.interceptors.request.use(async (config) => {
        try {
            const token = await getAccessTokenSilently()

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        } catch (error) {
            toast.error("Session expired. Please log in again.")

            logout({
                logoutParams: {
                    returnTo: window.location.origin,
                },
            })
        }

        return config
    })

    privateAxios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response.status === 401) {
                toast.error("You shall not pass.")

                logout({
                    logoutParams: {
                        returnTo: window.location.origin,
                    },
                })
            }

            toast.error("Server error.")

            return Promise.reject(error)
        }
    )

    return privateAxios
}
