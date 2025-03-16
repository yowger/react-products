import { queryOptions } from "@tanstack/react-query"

import { getProducts } from "@/features/products/api/requests/products"
import { PRODUCTS_QUERY_KEY } from "@/features/products/api/queryKeys"

import type { GetProductsParams } from "@/features/products/api/types/products"

export const productsQueryOptions = (params?: GetProductsParams) =>
    queryOptions({
        queryKey: [...PRODUCTS_QUERY_KEY, { params }],
        queryFn: () => getProducts(params),
    })
