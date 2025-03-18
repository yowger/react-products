import { useAuth0 } from "@auth0/auth0-react"
import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/(auth)/login")({
    component: RouteComponent,
})

function RouteComponent() {
    const { loginWithRedirect } = useAuth0()

    return <Button onClick={() => loginWithRedirect()}>Log In</Button>
}
