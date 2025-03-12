import { createFileRoute } from "@tanstack/react-router"

import { productsQueryOptions } from "@/features/products/api/queries/productsQueryOptions"
import { ProductPage } from "@/features/products"

export const Route = createFileRoute("/products/")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(productsQueryOptions()),
    component: RouteComponent,
})

function RouteComponent() {
    return <ProductPage />
}
