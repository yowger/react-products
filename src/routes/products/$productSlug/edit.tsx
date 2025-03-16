import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/products/$productSlug/edit")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/products/$productId/edit"!</div>
}
