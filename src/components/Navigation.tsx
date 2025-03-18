import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "@tanstack/react-router"
import { User } from "lucide-react"

import LogInButton from "@/components/auth/logInButton"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"

export default function Navigation() {
    const { isAuthenticated, logout } = useAuth0()

    return (
        <header>
            <nav className="px-4 flex items-center justify-between flex-wrap">
                <div>
                    <span className="font-bold">LOGO</span>
                </div>

                <ul className="flex p-4 font-medium">
                    <li>
                        <Link
                            to="/products"
                            activeProps={{
                                className: "font-semibold",
                            }}
                            className="block py-2 px-3"
                        >
                            Home
                        </Link>
                    </li>
                </ul>
                {isAuthenticated ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <User />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link
                                    to="/profile"
                                    activeProps={{
                                        className: "font-semibold",
                                    }}
                                >
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    logout({
                                        logoutParams: {
                                            returnTo: window.location.origin,
                                        },
                                    })
                                }
                                className="cursor-pointer"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <LogInButton />
                )}
            </nav>
        </header>
    )
}
