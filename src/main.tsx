import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import "@/index.css"
import AppProvider from "@/providers/appProvider"
import Auth0Provider from "@/providers/auth0Provider"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <Auth0Provider>
                <AppProvider />
            </Auth0Provider>
        </StrictMode>
    )
}
