import {
    createFileRoute,
    ErrorComponentProps,
    Outlet,
    useRouter,
} from "@tanstack/react-router"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { ProductNotFoundError } from "@/features/products/api/requests/products"

export const Route = createFileRoute("/(products)/products")({
    component: RouteComponent,
    errorComponent: ErrorComponent,
})

function RouteComponent() {
    return <Outlet />
}

function ErrorComponent(props: ErrorComponentProps) {
    const { error } = props

    if (error instanceof ProductNotFoundError) {
        return <div>{error.message}</div>
    }

    const router = useRouter()
    const queryErrorResetBoundary = useQueryErrorResetBoundary()

    useEffect(() => {
        queryErrorResetBoundary.reset()
    }, [queryErrorResetBoundary])

    return (
        <div>
            <p>Something went wrong.</p>
            <Button
                onClick={() => {
                    router.invalidate()
                }}
            >
                Retry
            </Button>
        </div>
    )
}
