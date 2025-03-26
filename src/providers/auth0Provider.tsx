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
            /* since I'm using a simple api from supabse, there are limitations such as storing cookies.
            So for this simple app I will use local storage to persist logged in user.
            in real app scenario, consider saving refresh token in your backend cookies and retrieving it on refresh to persist user.
            */
            cacheLocation="localstorage"
            useRefreshTokens={true}
        >
            {children}
        </Auth0LibProvider>
    )
}
