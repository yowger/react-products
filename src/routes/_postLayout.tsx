import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

import { Can } from "@/lib/abilities/abilityContext"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/_postLayout")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Posts</h2>
                <Can I="create" a="Post">
                    <Button asChild>
                        <Link to="/posts/create">+ Create Post</Link>
                    </Button>
                </Can>
            </div>
            
            <Outlet />
        </div>
    )
}
