import { useQuery } from "@tanstack/react-query"

import publicAxios from "@/api/axios/publicAxios"
import { CATEGORIES_QUERY_KEY } from "@/features/products/api/queryKeys"
import { time } from "@/lib/utils/time"

import type { CategoriesResponse } from "@/features/products/types/categories"
import type { ApiError } from "@/types/http"

export function getCategories(): Promise<CategoriesResponse> {
    return publicAxios.get("/categories")
}

export function useGetCategories() {
    return useQuery<CategoriesResponse, ApiError>({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: getCategories,
        refetchOnMount: false,
        staleTime: time.day(7),
    })
}
