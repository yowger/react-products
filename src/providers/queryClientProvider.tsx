import React from "react"

import {
    QueryClient,
    QueryClientProvider as QueryClientLibProvider,
} from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
})

type QueryClientProvider = React.PropsWithChildren

export default function QueryClientProvider(props: QueryClientProvider) {
    const { children } = props

    return (
        <QueryClientLibProvider client={queryClient}>
            {children}
        </QueryClientLibProvider>
    )
}
