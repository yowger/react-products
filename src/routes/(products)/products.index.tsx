import { createFileRoute } from "@tanstack/react-router"

import { Skeleton } from "@/components/ui/skeleton"
import { productsQueryOptions } from "@/features/products/api/queries/productsQueryOptions"
import { ProductsPage } from "@/features/products"

export const Route = createFileRoute("/(products)/products/")({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(productsQueryOptions()),
    component: ProductsPage,
    pendingComponent: LoadingComponent,
})

const productSkeletonLoader = Array.from({ length: 4 }).map((_, i) => (
    <div key={i}>
        <Skeleton className="w-full h-64 rounded-xs" />
        <div className="flex flex-col gap-1.5 mt-2">
            <Skeleton className="h-4 max-w-3/5" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    </div>
))

function LoadingComponent() {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-10 sm:gap-y-12 md:gap-y-14 lg:gap-y-16">
            {productSkeletonLoader}
        </div>
    )
}
