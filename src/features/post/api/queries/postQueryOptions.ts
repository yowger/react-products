import { queryOptions } from "@tanstack/react-query"

import { getPost } from "@/features/post/api/post"
import { POSTS_QUERY_KEY } from "@/features/shared/api/queryKeys"

export const postQueryOptions = (id: string) =>
    queryOptions({
        queryKey: [...POSTS_QUERY_KEY, id],
        queryFn: () => getPost(id),
    })
