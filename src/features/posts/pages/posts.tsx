import { useAuth0, type User } from "@auth0/auth0-react"
import { Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { postsQueryOptions } from "@/features/posts/api/queries/postsQueryOptions"
import { type Post } from "@/types/post"

interface PostCardProps {
    post: Post
    currentUser: User | undefined
}

export default function Posts() {
    const { user } = useAuth0()
    const { data: postsData } = useSuspenseQuery(postsQueryOptions({}))

    if (!postsData.length) {
        return <p>No posts found.</p>
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-6 lg:gap-12">
            {postsData.map((post) => (
                <PostCard key={post.id} post={post} currentUser={user} />
            ))}
        </ul>
    )
}

function PostCard(props: PostCardProps) {
    const { post, currentUser } = props
    const isCurrentUser = currentUser?.sub === post.authorId.auth0Id

    return (
        <li>
            <Link to="/posts/$id" params={{ id: post.id }}>
                <div className="flex flex-col gap-y-4 bg-white rounded-xs p-4 shadow-sm h-full">
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p className="line-clamp-4 text-gray-700">{post.content}</p>

                    <div className="flex-1" />

                    <div className="flex space-x-2 items-center">
                        <Avatar className="size-8">
                            <AvatarImage
                                src={post.authorId.avatarUrl}
                                alt={post.authorId.name}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col space-y-0.5">
                            <span className="text-xs font-bold">
                                {isCurrentUser ? "You" : post.authorId.name}
                            </span>
                            <span className="text-xs text-gray-600">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}
