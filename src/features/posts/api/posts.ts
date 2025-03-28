import publicAxios from "@/api/axios/publicAxios"
import type { GetPostsParams, Post } from "@/types/post"
import { createQueryString } from "@/lib/utils/queryParams"

const TABLE_POSTS = "posts"

export const POSTS_API = {
    GET_POSTS: `/${TABLE_POSTS}`,
    CREATE_POST: `/${TABLE_POSTS}`,
}

export async function getPosts(params?: GetPostsParams): Promise<Post[]> {
    const queryString = createQueryString({
        limit: params?.limit,
        offset: params?.offset,
        title: params?.search ? `ilike.%${params.search}%` : undefined,
        order: params?.orderBy,
        orderDirection: params?.orderDirection || "desc",
    })

    const url = `${POSTS_API.GET_POSTS}${queryString ? `?${queryString}` : ""}`

    const posts = await publicAxios
        .get(POSTS_API.GET_POSTS)
        .then((res) => res.data)
        .catch((err) => {
            throw err
        })

    return posts
}

