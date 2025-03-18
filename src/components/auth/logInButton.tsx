import { useAuth0 } from "@auth0/auth0-react"

import { Button } from "@/components/ui/button"
import React from "react"

interface LogInButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    children?: React.ReactNode
}

export default function LogInButton(props: LogInButtonProps) {
    const { children, ...restProps } = props

    const { loginWithRedirect } = useAuth0()

    return (
        <Button
            onClick={() =>
                loginWithRedirect({
                    appState: { returnTo: window.location.pathname },
                })
            }
            variant={"link"}
            {...restProps}
        >
            {children || "Log In"}
        </Button>
    )
}
