import { queryOptions } from "@tanstack/react-query"

import { getProduct } from "@/features/products/api/requests/products"
import { PRODUCTS_QUERY_KEY } from "@/features/products/api/queryKeys"

export const productQueryOptions = (id: string) =>
    queryOptions({
        queryKey: [...PRODUCTS_QUERY_KEY, id],
        queryFn: () => getProduct(id),
    })
