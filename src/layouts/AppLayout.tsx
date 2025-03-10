import React from "react"

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout(props: AppLayoutProps) {
    const { children } = props

    return (
        <div className="p-4">
            <div className="flex flex-col mx-auto max-w-7xl">{children}</div>
        </div>
    )
}
