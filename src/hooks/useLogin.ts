import { useAuth0 } from "@auth0/auth0-react"

export function useLogin(redirectTo?: string) {
    const { loginWithRedirect } = useAuth0()

    const handleLogin = () => {
        loginWithRedirect({
            appState: {
                returnTo: redirectTo || window.location.pathname,
            },
        })
    }

    return handleLogin
}
