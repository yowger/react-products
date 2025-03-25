import { useParams } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Calendar, Pencil, Trash } from "lucide-react"

import { postQueryOptions } from "@/features/post/api/queries/postQueryOptions"
import { Button } from "@/components/ui/button"
import { Can } from "@/lib/abilities/abilityContext"

export default function Post() {
    const postId = useParams({
        from: "/posts/$id",
        select: (params) => params.id,
    })
    const { data: postData } = useSuspenseQuery(postQueryOptions(postId))

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 space-y-6">
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {postData.title}
                        </h1>

                        <div className="flex gap-2">
                            <Can I="update" a="Post">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="cursor-pointer"
                                >
                                    <Trash />
                                </Button>
                            </Can>
                            <Can I="delete" a="Post">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="cursor-pointer"
                                >
                                    <Pencil />
                                </Button>
                            </Can>
                        </div>
                    </div>

                    <p className="mb-2 flex items-center text-gray-500 gap-2 font-semibold text-sm">
                        <Calendar size={15} />

                        <span>
                            {new Date(postData.created_at).toLocaleDateString()}
                        </span>
                    </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                    {postData.content}
                </p>
            </div>
        </div>
    )
}
