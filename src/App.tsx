import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"

import ProductPage from "@/features/products/pages/ProductPage"
import AppLayout from "@/layouts/AppLayout"
import { Button } from "@/components/ui/button"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
})

function ErrorFallback(props: FallbackProps) {
    const { resetErrorBoundary } = props

    return (
        <div
            role="alert"
            className="flex flex-col items-center justify-center h-screen"
        >
            <div className="p-4 text-center">
                <p className="text-gray-900 font-semibold text-lg mb-10">
                    Opps! Something went wrong:
                </p>
                <Button onClick={resetErrorBoundary}>Try again</Button>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
                <AppLayout>
                    <ProductPage />
                </AppLayout>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    )
}
