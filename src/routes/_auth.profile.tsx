import { useAuth0 } from "@auth0/auth0-react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/profile")({
    component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth0()

    return <div>{user?.name} asd</div>
}
