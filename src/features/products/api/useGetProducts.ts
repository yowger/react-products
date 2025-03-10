import { useQuery } from "@tanstack/react-query"

import publicAxios from "@/api/axios/publicAxios"
import { PRODUCTS_QUERY_KEY } from "@/features/products/api/queryKeys"

import type { ProductResponse } from "@/features/products/types/products"
import type { ApiError } from "@/types/http"

export function getProducts(): Promise<ProductResponse> {
    return publicAxios.get("/products")
}

// TODO: add filter
export function useGetProducts() {
    return useQuery<ProductResponse, ApiError>({
        queryKey: [...PRODUCTS_QUERY_KEY],
        queryFn: getProducts,
    })
}
