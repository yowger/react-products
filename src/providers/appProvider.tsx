import { useAuth0 } from "@auth0/auth0-react"
import { QueryClient } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

import defineAbilitiesFor, { type UserRole } from "@/lib/abilities/ability"
import QueryClientProvider from "@/providers/queryClientProvider"
import AbilityProvider from "@/providers/abilityProvider"
import RouterProvider from "@/providers/routerProvider"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
})

const defaultGuestRole = "guest"

export default function AppProvider() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, logout } =
        useAuth0()

    const [roles, setRoles] = useState<UserRole[]>([defaultGuestRole])

    useEffect(() => {
        async function decodeToken() {
            try {
                const token = await getAccessTokenSilently()
                return jwtDecode(token)
            } catch (error) {
                logout()
            }
        }

        function getUserRoleFromToken(token: any) {
            const namespace = "https://shopey.com/roles"
            const rolesFromToken = token[namespace] || [defaultGuestRole]

            setRoles(rolesFromToken)
        }

        if (isAuthenticated) {
            decodeToken().then((token) => {
                if (token) {
                    getUserRoleFromToken(token)
                }
            })
        }
    }, [isAuthenticated, getAccessTokenSilently])

    const ability = defineAbilitiesFor(user, roles)

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <AbilityProvider ability={ability}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider
                    ability={ability}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    queryClient={queryClient}
                />
                <Toaster />
            </QueryClientProvider>
        </AbilityProvider>
    )
}
