import { notFound } from "@tanstack/react-router"

import publicAxios from "@/api/axios/publicAxios"
import type { Post, UpdatePostPayload } from "@/types/post"

const TABLE_POSTS = "posts"

const POSTS_API = {
    GET_POST: (id: string) => `/${TABLE_POSTS}?id=eq.${id}`,
    UPDATE_POST: (id: string) => `/${TABLE_POSTS}?id=eq.${id}`,
    DELETE_POST: (id: string) => `/${TABLE_POSTS}?id=eq.${id}`,
}

export async function getPost(id: string): Promise<Post> {
    const post = await publicAxios
        .get(POSTS_API.GET_POST(id))
        .then((res) => {
            if (res.data.length === 0) {
                throw notFound()
            }

            return res.data[0]
        })
        .catch((err) => {
            if (err.response?.status === 404) {
                throw notFound()
            }

            throw err
        })

    return post
}

export function updatePost(id: string, data: UpdatePostPayload): Promise<void> {
    return publicAxios.patch(POSTS_API.UPDATE_POST(id), data)
}

export function deletePost(id: string): Promise<void> {
    return publicAxios.delete(POSTS_API.DELETE_POST(id))
}
