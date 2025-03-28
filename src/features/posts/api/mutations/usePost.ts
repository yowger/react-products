import { useMutation, useQueryClient } from "@tanstack/react-query"

import { POSTS_API } from "@/features/posts/api/posts"
import { POSTS_QUERY_KEY } from "@/features/shared/api/queryKeys"
import { usePrivateAxios } from "@/api/axios/usePrivateAxios"
import { type CreatePostPayload } from "@/types/post"

export function usePost() {
    const queryClient = useQueryClient()
    const privateAxios = usePrivateAxios()

    return useMutation({
        mutationFn: async (data: CreatePostPayload) => {
            const response = await privateAxios.post(
                POSTS_API.CREATE_POST,
                data
            )

            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
        },
    })
}
