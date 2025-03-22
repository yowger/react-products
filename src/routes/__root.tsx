import { type User } from "@auth0/auth0-react"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import {
    createRootRouteWithContext,
    type ErrorComponentProps,
    Link,
    Outlet,
    useRouter,
} from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
    type QueryClient,
    useQueryErrorResetBoundary,
} from "@tanstack/react-query"
import { useEffect } from "react"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { type AppAbility } from "@/lib/abilities/ability"

export const Route = createRootRouteWithContext<{
    ability: AppAbility
    user: User
    isAuthenticated: boolean
    queryClient: QueryClient
}>()({
    component: Root,
    notFoundComponent: NotFound,
    errorComponent: ErrorComponent,
})

function Root() {
    return (
        <>
            <Navigation />
            <div className="p-4 flex flex-col mx-auto max-w-7xl">
                <Outlet />
            </div>
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
        </>
    )
}

function NotFound() {
    return (
        <div>
            <p>Page not found.</p>
            <Link to="/">Return home</Link>
        </div>
    )
}

function ErrorComponent(_props: ErrorComponentProps) {
    const router = useRouter()
    const queryErrorResetBoundary = useQueryErrorResetBoundary()

    useEffect(() => {
        queryErrorResetBoundary.reset()
    }, [queryErrorResetBoundary])

    return (
        <div>
            <p>Something went wrong.</p>

            <Button
                onClick={() => {
                    router.invalidate()
                }}
            >
                Retry
            </Button>
        </div>
    )
}
