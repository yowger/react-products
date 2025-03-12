import publicAxios from "@/api/axios/publicAxios"

import type { ProductResponse } from "@/features/products/types/products"

interface GetProductsParams {
    categoryId?: string
    minPrice?: number
    maxPrice?: number
    search?: string
    page?: number
    pageSize?: number
    createdAfter?: string
    createdBefore?: string
}

export function getProducts(
    params?: GetProductsParams
): Promise<ProductResponse[]> {
    return publicAxios.get("/products", { params })
}

export function getProduct(id: string): Promise<ProductResponse> {
    return publicAxios.get(`/products/${id}`)
}

// TODO: Add auth below
interface CreateProductPayload {
    name: string
    description: string
    price: number
    categoryId: string
}

export function createProduct(data: CreateProductPayload): Promise<void> {
    return publicAxios.post("/products", data)
}

interface UpdateProductPayload {
    name?: string
    description?: string
    price?: number
    categoryId?: string
}

export function updateProduct(
    id: string,
    data: UpdateProductPayload
): Promise<void> {
    return publicAxios.patch(`/products/${id}`, data)
}

export function deleteProduct(id: string): Promise<void> {
    return publicAxios.delete(`/products/${id}`)
}
