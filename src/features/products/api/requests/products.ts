import publicAxios from "@/api/axios/publicAxios"
import { notFound } from "@tanstack/react-router"

import type {
    CreateProductPayload,
    GetProductsParams,
    UpdateProductPayload,
    ProductResponse,
    ProductsResponse,
} from "@/features/products/api/types/products"

const PRODUCTS_API = {
    GET_PRODUCTS: "/products",
    GET_PRODUCT: (slug: string) => `/products/${slug}`,
    CREATE_PRODUCT: "/products",
    UPDATE_PRODUCT: (id: string) => `/products/${id}`,
    DELETE_PRODUCT: (id: string) => `/products/${id}`,
}

export async function getProducts(
    params?: GetProductsParams
): Promise<ProductsResponse> {
    const products = await publicAxios
        .get(PRODUCTS_API.GET_PRODUCTS, {
            params,
        })
        .then((res) => res.data)
        .catch((err) => {
            throw err
        })

    return products
}

export async function getProduct(slug: string): Promise<ProductResponse> {
    const product = await publicAxios
        .get(PRODUCTS_API.GET_PRODUCT(slug))
        .then((res) => res.data)
        .catch((err) => {
            if (err.status === 404) {
                throw notFound()
            }

            throw err
        })

    return product
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
