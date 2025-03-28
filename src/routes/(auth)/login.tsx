import { createFileRoute, redirect } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { useLogin } from "@/hooks/useLogin"
import { z } from "zod"

const fallback = "/posts" as const

export const Route = createFileRoute("/(auth)/login")({
    validateSearch: z.object({
        redirect: z.string().optional().catch(""),
    }),
    beforeLoad: ({ context, search }) => {
        if (context.isAuthenticated) {
            throw redirect({
                to: search.redirect || fallback,
            })
        }
    },
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
