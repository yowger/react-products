export interface Post {
    id: string
    title: string
    content: string
    author_id: string
    created_at: string
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
    author_id: string
}

export interface UpdatePostPayload {
    title?: string
    content?: string
}
