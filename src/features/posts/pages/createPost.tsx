import PostForm from "@/features/posts/components/postForm"

export function CreatePost() {
    return (
        <div className="bg-white rounded-lg shadow space-y-6 p-6">
            <div>
                <h3 className="text-lg font-medium">Create Post</h3>
            </div>

            <PostForm />
        </div>
    )
}
