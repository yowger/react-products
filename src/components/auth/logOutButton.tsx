import { useAuth0 } from "@auth0/auth0-react"

import { Button } from "@/components/ui/button"
import React from "react"

interface LogoutButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    children?: React.ReactNode
}

export default function LogoutButton(props: LogoutButtonProps) {
    const { children, ...restProps } = props

    const { logout } = useAuth0()

    return (
        <Button
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
            {...restProps}
        >
            {children || "Log out"}
        </Button>
    )
}
