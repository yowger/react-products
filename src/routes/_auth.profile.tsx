import { useAuth0 } from "@auth0/auth0-react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/profile")({
    component: RouteComponent,
})

function RouteComponent() {
    const { user, getAccessTokenSilently } = useAuth0()
    console.log("🚀 ~ RouteComponent ~ user:", user)

    getAccessTokenSilently().then((token) => {
        console.log("token", token)
    })

    return <div>{user?.name} asd</div>
}
