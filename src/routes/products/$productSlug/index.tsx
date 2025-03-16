import { createFileRoute } from "@tanstack/react-router"

import ProductPage from "@/features/products/pages/ProductPage"
import { productQueryOptions } from "@/features/products/api/queries/productQueryOptions"

export const Route = createFileRoute("/products/$productSlug/")({
    loader: ({ context: { queryClient }, params: { productSlug } }) =>
        queryClient.ensureQueryData(productQueryOptions(productSlug)),
    component: ProductPage,
    pendingComponent: () => {
        return <div>Loading product...</div>
    },
})
