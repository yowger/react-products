import { createFileRoute, redirect } from "@tanstack/react-router"
import { subject } from "@casl/ability"

import { postQueryOptions } from "@/features/post/api/queries/postQueryOptions"

export const Route = createFileRoute("/posts/$id/edit")({
    loader: async ({ context: { ability, queryClient }, params: { id } }) => {
        const postData = await queryClient.ensureQueryData(postQueryOptions(id))

        if (!ability.can("update", subject("Post", postData))) {
            throw redirect({
                to: "/posts/$id",
                params: { id },
            })
        }
    },
    component: RouteComponent,
    pendingComponent: () => {
        return <div>Loading edit post</div>
    },
    errorComponent: () => {
        return <div>Failed to fetch edit post</div>
    },
})

function RouteComponent() {
    return <div>Hello "/posts/$id/edit"!</div>
}
