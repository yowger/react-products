import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(app)/profile")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/profile"!</div>
}
