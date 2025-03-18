import { useSuspenseQuery } from "@tanstack/react-query"

import { productQueryOptions } from "@/features/products/api/queries/productQueryOptions"
import { Route } from "@/routes/products.$slug"

export default function ProductPage() {
    const productSlug = Route.useParams().slug
    const { data: productData } = useSuspenseQuery(
        productQueryOptions(productSlug)
    )

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{productData.name}</h1>
            <p className="text-gray-600">{productData.description}</p>

            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <p className="text-lg font-semibold">
                    Price: ${productData.price}
                </p>
                <p className="text-sm text-gray-500">
                    Added on:{" "}
                    {new Date(productData.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    )
}
