import { useAuth0 } from "@auth0/auth0-react"

export function useLogout() {
    const { logout } = useAuth0()

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } })
    }

    return handleLogout
}
