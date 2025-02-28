import ProductPage from "@/features/products/pages/ProductPage"
import React from "react"

export default function App() {
    return (
        <div>
            <AppLayout>
                <ProductPage />
            </AppLayout>
        </div>
    )
}

interface AppLayoutProps {
    children: React.ReactNode
}

function AppLayout(props: AppLayoutProps) {
    const { children } = props

    return (
        <div className="p-4">
            <div className="flex flex-col mx-auto max-w-7xl">{children}</div>
        </div>
    )
}
