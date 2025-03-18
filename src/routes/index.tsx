import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    beforeLoad: () => {
        return redirect({
            to: "/products",
            throw: true,
        })
    },
})
