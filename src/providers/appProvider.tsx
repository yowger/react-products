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

export default function AppProvider() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
        useAuth0()

    const defaultGuestRole = "guest"
    const [roles, setRoles] = useState<UserRole[]>([defaultGuestRole])

    useEffect(() => {
        async function getUserRoles() {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently()
                    const decodedToken: any = jwtDecode(token)

                    const namespace = "https://shopey.com/roles"
                    const rolesFromToken = decodedToken[namespace] || [
                        defaultGuestRole,
                    ]

                    setRoles(rolesFromToken)
                } catch (error) {
                    console.error("Error fetching roles:", error)
                }
            }
        }

        getUserRoles()
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
