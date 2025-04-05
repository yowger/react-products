import publicAxios from "@/api/axios/publicAxios"
import type { GetPostsParams, Post } from "@/types/post"
// import { createQueryString } from "@/lib/utils/queryParams"
import { camelizeKeys } from "@/lib/utils/camelizeKeys"

const TABLE_POSTS = "posts"

export const POSTS_API = {
    GET_POSTS: `/${TABLE_POSTS}`,
    CREATE_POST: `/${TABLE_POSTS}`,
}

export async function getPosts(_params?: GetPostsParams): Promise<Post[]> {
    // const queryString = createQueryString({
    //     limit: params?.limit,
    //     offset: params?.offset,
    //     title: params?.search ? `ilike.%${params.search}%` : undefined,
    //     order: params?.orderBy,
    //     orderDirection: params?.orderDirection || "desc",
    // })

    const url = `${POSTS_API.GET_POSTS}?select=*,author_id(*)`
    //  const url = `${POSTS_API.GET_POSTS}${queryString ? `?${queryString}` : ""}`

    const posts = await publicAxios
        .get<Post[]>(url)
        .then((res) => camelizeKeys(res.data))
        .catch((err) => {
            throw err
        })

    return posts
}

