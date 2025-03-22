import { type User } from "@auth0/auth0-react"
import {
    RouterProvider as RouterProviderLib,
    createBrowserHistory,
    createRouter,
} from "@tanstack/react-router"

import { routeTree } from "@/routeTree.gen"
import { type AppAbility } from "@/lib/abilities/ability"
import { type QueryClient } from "@tanstack/react-query"

const router = createRouter({
    routeTree,
    context: {
        ability: undefined!,
        isAuthenticated: false,
        user: undefined!,
        queryClient: undefined!,
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

interface RouterProviderProps extends React.PropsWithChildren {
    ability: AppAbility
    user: User | undefined
    isAuthenticated: boolean
    queryClient: QueryClient
}

export default function RouterProvider(props: RouterProviderProps) {
    const { ability, isAuthenticated, user, queryClient } = props

    return (
        <RouterProviderLib
            router={router}
            context={{
                ability,
                user,
                isAuthenticated,
                queryClient,
            }}
        />
    )
}
