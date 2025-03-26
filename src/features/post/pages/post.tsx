import { Link, useParams } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { postQueryOptions } from "@/features/post/api/queries/postQueryOptions"
import { Can } from "@/lib/abilities/abilityContext"

export default function Post() {
    const postId = useParams({
        from: "/posts/$id",
        select: (params) => params.id,
    })
    const { data: postData } = useSuspenseQuery(postQueryOptions(postId))

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-5">
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {postData.title}
                        </h1>

                        <div className="flex gap-2">
                            <Can I="update" a="Post" this={postData}>
                                {() => (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="cursor-pointer"
                                    >
                                        <Trash />
                                    </Button>
                                )}
                            </Can>

                            <Can I="delete" a="Post" this={postData}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="cursor-pointer"
                                    asChild={true}
                                >
                                    <Link
                                        to="/posts/$id/edit"
                                        params={{ id: postId }}
                                    >
                                        <Pencil />
                                    </Link>
                                </Button>
                            </Can>
                        </div>
                    </div>

                    <div className="flex gap-5 items-center">
                        <span className="text-sm text-gray-800">
                            by: auth0 name here
                        </span>

                        <span className="flex text-sm text-gray-800">
                            created at:{" "}
                            {new Date(postData.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <p className="text-lg text-gray-800">
                    {postData.content}
                </p>
            </div>
        </div>
    )
}
