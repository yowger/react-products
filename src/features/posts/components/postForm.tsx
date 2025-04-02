import { useAuth0 } from "@auth0/auth0-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePost } from "@/features/posts/api/mutations/usePost"

const FormSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    content: z.string().min(5, {
        message: "Description must be at least 10 characters.",
    }),
})

export default function PostForm() {
    const { user } = useAuth0()
    const { mutate, isPending } = usePost()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!!user?.sub) {
            mutate(
                {
                    ...data,
                    authorId: user.sub,
                },
                {
                    onSuccess: () => {
                        toast.success("Post successfully created.")

                        form.reset()
                    },
                    onError: (error) => {
                        toast.error("Post failed to be created.")
                        console.log("error", error)
                    },
                }
            )
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter post title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter post content"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}>
                    Create Post
                </Button>
            </form>
        </Form>
    )
}
