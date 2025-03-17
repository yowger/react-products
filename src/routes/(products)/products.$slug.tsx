import { createFileRoute } from "@tanstack/react-router"

import ProductPage from "@/features/products/pages/ProductPage"
import { productQueryOptions } from "@/features/products/api/queries/productQueryOptions"

export const Route = createFileRoute("/(products)/products/$slug")({
    loader: ({ context: { queryClient }, params: { slug } }) =>
        queryClient.ensureQueryData(productQueryOptions(slug)),
    component: ProductPage,
    pendingComponent: () => {
        return <div>Loading product...</div>
    },
    notFoundComponent: () => {
        return <div>{`Product not found :(`}</div>
    },
})
