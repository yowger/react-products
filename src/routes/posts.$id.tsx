import { postQueryOptions } from "@/features/post/api/queries/postQueryOptions"
import { createFileRoute } from "@tanstack/react-router"

import Post from "@/features/post/pages/post"

export const Route = createFileRoute("/posts/$id")({
    loader: ({ context: { queryClient }, params: { id } }) =>
        queryClient.ensureQueryData(postQueryOptions(id)),
    component: Post,
    pendingComponent: () => {
        return <div>Loading post</div>
    },
    errorComponent: () => {
        return <div>Failed to fetch post</div>
    },
})
