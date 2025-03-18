import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import "@/index.css"
import { Auth0Provider, RouterProvider, QueryClientProvider } from "@/providers"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <Auth0Provider>
                <QueryClientProvider>
                    <RouterProvider />
                </QueryClientProvider>
            </Auth0Provider>
        </StrictMode>
    )
}
