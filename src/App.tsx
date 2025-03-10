import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import ProductPage from "@/features/products/pages/ProductPage"
import AppLayout from "@/layouts/AppLayout"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
})

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppLayout>
                <ProductPage />
            </AppLayout>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
