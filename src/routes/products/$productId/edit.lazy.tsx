import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/products/$productId/edit")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/products/$productId/edit"!</div>
}
