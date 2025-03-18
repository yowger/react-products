import { Auth0Provider } from "@auth0/auth0-react"
import {
    RouterProvider,
    createBrowserHistory,
    createRouter,
} from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import "@/index.css"
import { routeTree } from "@/routeTree.gen"
import { config } from "./lib/config"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
})

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

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <Auth0Provider
                domain={config.auth.VITE_AUTH_DOMAIN}
                clientId={config.auth.VITE_AUTH_CLIENT_ID}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Auth0Provider>
        </StrictMode>
    )
}
