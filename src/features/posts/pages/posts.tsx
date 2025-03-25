import { useSuspenseQuery } from "@tanstack/react-query"

import { postsQueryOptions } from "@/features/posts/api/queries/postsQueryOptions"
import { Link } from "@tanstack/react-router"
import { Calendar } from "lucide-react"

export default function Posts() {
    const { data: postsData } = useSuspenseQuery(postsQueryOptions({}))

    return (
        <div>
            <h2>Posts</h2>
            {postsData.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-10 sm:gap-y-12 md:gap-y-14 lg:gap-y-16">
                    {postsData.map((post) => (
                        <li key={post.id}>
                            <Link
                                to="/posts/$id"
                                params={{
                                    id: post.id,
                                }}
                            >
                                <div className="bg-white rounded-sm p-4 shadow-sm">
                                    <h3 className="text-lg font-semibold mb-1">
                                        {post.title}
                                    </h3>
                                    <p className="mb-5">{post.content}</p>
                                    <small className="mb-2 flex items-center text-gray-800 gap-2">
                                        <Calendar size={15} />
                                        <span>
                                            {new Date(
                                                post.created_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </small>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
