import { pagination } from "@/types/pagination"

export interface Product {
    id: number
    name: string
    description: string
    categoryId: string
    price: number
    createdAt: Date
    updatedAt: Date
}

export interface ProductResponse {
    data: Product[]
    pagination: pagination
}
