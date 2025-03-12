import publicAxios from "@/api/axios/publicAxios"

import type { CategoriesResponse } from "@/features/products/types/categories"

export function getCategories(): Promise<CategoriesResponse> {
    return publicAxios.get("/categories")
}
