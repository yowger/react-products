import { User } from "@/types/users"

export interface Post {
    id: string
    title: string
    content: string
    authorId: User
    createdAt: Date
    updatedAt: Date
}

export interface GetPostsParams {
    limit?: number
    offset?: number
    search?: string
    orderBy?: "created_at" | "title"
    orderDirection?: "asc" | "desc"
}

export interface CreatePostPayload {
    title: string
    content: string
    authorId: string
}

export interface UpdatePostPayload {
    title?: string
    content?: string
}
