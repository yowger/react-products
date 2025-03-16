import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/products/$productId/")({
    loader: async () => {},
    component: RouteComponent,
    notFoundComponent: NotFoundComponent,
})

function RouteComponent() {
    console.log("single product")
    return <div>Hello "/products/$productId/"!</div>
}

function NotFoundComponent() {
    return <div>Product not found</div>
}
