import { useAuth0 } from "@auth0/auth0-react"

import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)/profile")({
    component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth0()
    console.log("🚀 ~ RouteComponent ~ user:", user)

    return <div>Hello "/profile"!</div>
}
