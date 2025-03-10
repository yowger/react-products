export interface Category {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
}

export type CategoriesResponse = Category[]
