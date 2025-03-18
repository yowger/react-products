import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/products/$slug/edit")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(products)/products/$slug/edit"!</div>
}
