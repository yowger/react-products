import React from "react"

import {
    QueryClientProvider as QueryClientLibProvider,
    type QueryClient,
} from "@tanstack/react-query"

interface QueryClientProviderProps extends React.PropsWithChildren {
    client: QueryClient
}

export default function QueryClientProvider(props: QueryClientProviderProps) {
    const { children, client } = props

    return (
        <QueryClientLibProvider client={client}>
            {children}
        </QueryClientLibProvider>
    )
}
