import { useAuth0, User } from "@auth0/auth0-react"
import {
    RouterProvider as RouterProviderLib,
    createBrowserHistory,
    createRouter,
} from "@tanstack/react-router"

import { routeTree } from "@/routeTree.gen"
import { queryClient } from "@/providers/queryClientProvider"

const router = createRouter({
    routeTree,
    context: {
        user: undefined!,
        isAuthenticated: false,
        queryClient,
    },
    history: createBrowserHistory(),
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

export default function RouterProvider() {
    const { user, isAuthenticated, isLoading } = useAuth0()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <RouterProviderLib
            router={router}
            context={{ user, isAuthenticated, queryClient }}
        />
    )
}
