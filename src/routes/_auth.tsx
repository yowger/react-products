import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
    beforeLoad: ({ context, location }) => {
        if (!context.isAuthenticated) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            })
            
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    return <Outlet />
}
