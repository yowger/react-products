import publicAxios from "@/api/axios/publicAxios"

import {
    CreateProductPayload,
    GetProductsParams,
    UpdateProductPayload,
    ProductResponse,
} from "@/features/products/api/types/products"

const PRODUCTS_API = {
    GET_PRODUCTS: "/products",
    GET_PRODUCT: (id: string) => `/products/${id}`,
    CREATE_PRODUCT: "/products",
    UPDATE_PRODUCT: (id: string) => `/products/${id}`,
    DELETE_PRODUCT: (id: string) => `/products/${id}`,
}

export function getProducts(
    params?: GetProductsParams
): Promise<ProductResponse> {
    return publicAxios.get(PRODUCTS_API.GET_PRODUCTS, { params })
}

export function getProduct(id: string): Promise<ProductResponse> {
    return publicAxios.get(PRODUCTS_API.GET_PRODUCT(id))
}

// TODO: Add auth below
export function createProduct(data: CreateProductPayload): Promise<void> {
    return publicAxios.post(PRODUCTS_API.CREATE_PRODUCT, data)
}

export function updateProduct(
    id: string,
    data: UpdateProductPayload
): Promise<void> {
    return publicAxios.patch(PRODUCTS_API.UPDATE_PRODUCT(id), data)
}

export function deleteProduct(id: string): Promise<void> {
    return publicAxios.delete(PRODUCTS_API.DELETE_PRODUCT(id))
}
