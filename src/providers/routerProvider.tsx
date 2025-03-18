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
    return <RouterProviderLib router={router} />
}
