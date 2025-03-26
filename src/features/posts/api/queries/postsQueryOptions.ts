import { queryOptions } from "@tanstack/react-query"

import { getPosts } from "@/features/posts/api/posts"
import { type GetPostsParams } from "@/types/post"
import { POSTS_QUERY_KEY } from "@/features/shared/api/queryKeys"

export const postsQueryOptions = (params: GetPostsParams) =>
    queryOptions({
        queryKey: [...POSTS_QUERY_KEY, { params }],
        queryFn: () => getPosts(params),
    })
