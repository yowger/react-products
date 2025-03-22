import { useAuth0 } from "@auth0/auth0-react"
import { QueryClient } from "@tanstack/react-query"

import defineAbilitiesFor from "@/lib/abilities/ability"
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
    const { user, isAuthenticated, isLoading } = useAuth0()
    const ability = defineAbilitiesFor(user)
    console.log("🚀 ~ AppProvider ~ ability:", ability)

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
            </QueryClientProvider>
        </AbilityProvider>
    )
}
