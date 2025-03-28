import { createFileRoute } from "@tanstack/react-router"

import Posts from "@/features/posts/pages/posts"
import { postsQueryOptions } from "@/features/posts/api/queries/postsQueryOptions"

export const Route = createFileRoute("/_postLayout/posts/")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(postsQueryOptions({})),
    component: Posts,
    pendingComponent: () => {
        return <div>Loading posts</div>
    },
    errorComponent: () => {
        return <div>Failed to fetch posts</div>
    },
})
