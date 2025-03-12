import type { Product } from "@/features/products/types/products"
import type { pagination } from "@/types/pagination"

export interface GetProductsParams {
    categoryId?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    page?: number
    pageSize?: number
    createdAfter?: string
    createdBefore?: string
}

export interface CreateProductPayload {
    name: string
    description: string
    price: number
    categoryId: string
}

export interface UpdateProductPayload {
    name?: string
    description?: string
    price?: number
    categoryId?: string
}

export interface ProductResponse {
    data: Product[]
    pagination: pagination
}
