import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"

import { Can } from "@/lib/abilities/abilityContext"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/_postLayout")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Posts</h2>
                <Can I="create" a="Post">
                    <Button asChild className="rounded-full" size="icon">
                        <Link to="/posts/create">
                            <PlusIcon />
                        </Link>
                    </Button>
                </Can>
            </div>

            <Outlet />
        </div>
    )
}
