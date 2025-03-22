import { Auth0Provider as Auth0LibProvider } from "@auth0/auth0-react"
import { config } from "@/lib/config"

type Auth0ProviderProps = React.PropsWithChildren

export default function Auth0Provider(props: Auth0ProviderProps) {
    const { children } = props

    return (
        <Auth0LibProvider
            domain={config.auth.VITE_AUTH_DOMAIN}
            clientId={config.auth.VITE_AUTH_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: config.auth.VITE_AUTH_AUDIENCE,
            }}
            cacheLocation="memory"
            useRefreshTokens={true}
        >
            {children}
        </Auth0LibProvider>
    )
}
