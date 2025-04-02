import { createFileRoute } from "@tanstack/react-router"

import { CreatePost } from "@/features/posts/pages/createPost"

export const Route = createFileRoute("/_auth/posts/create")({
    component: CreatePost,
})
