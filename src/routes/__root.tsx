import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import {
    createRootRouteWithContext,
    Link,
    Outlet,
} from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient } from "@tanstack/react-query"

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: Root,
    notFoundComponent: NotFound,
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
                        activeOptions={{ exact: true }}
                        className="block py-2 px-3"
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link
                        to="/products/create"
                        activeProps={{
                            className: "font-semibold",
                        }}
                        className="block py-2 px-3"
                    >
                        Create
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
