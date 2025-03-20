import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { useLogin } from "@/hooks/useLogin"

export const Route = createFileRoute("/(auth)/login")({
    component: RouteComponent,
})

function RouteComponent() {
    const handleLogin = useLogin()

    return (
        <div>
            <Button onClick={handleLogin}>Log in</Button>
        </div>
    )
}
