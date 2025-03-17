import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import {
    createRootRouteWithContext,
    ErrorComponentProps,
    Link,
    Outlet,
    useRouter,
} from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, useQueryErrorResetBoundary } from "@tanstack/react-query"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export const Route = createRootRouteWithContext<{
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
            <div className="p-4">
                <div className="flex flex-col mx-auto max-w-7xl">
                    <Outlet />
                </div>
            </div>
            <ReactQueryDevtools buttonPosition="top-right" />
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

function Navigation() {
    return (
        <div className="flex items-center justify-center">
            <ul className="flex p-4 font-medium">
                <li>
                    <Link
                        to="/products"
                        activeProps={{
                            className: "font-semibold",
                        }}
                        className="block py-2 px-3"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                        activeProps={{
                            className: "font-semibold",
                        }}
                        className="block py-2 px-3"
                    >
                        Profile
                    </Link>
                </li>
            </ul>
        </div>
    )
}
