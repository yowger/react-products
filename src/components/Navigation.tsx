import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "@tanstack/react-router"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogin } from "@/hooks/useLogin"
import { useLogout } from "@/hooks/useLogout"

export default function Navigation() {
    const { user, isAuthenticated } = useAuth0()

    const login = useLogin()
    const logout = useLogout()

    return (
        <header>
            <nav className="px-4 flex items-center justify-between flex-wrap">
                <div>
                    <span className="font-bold">POST</span>
                </div>

                <ul className="flex p-4 font-medium">
                    <li>
                        <Link
                            to="/posts"
                            activeProps={{
                                className: "font-semibold",
                            }}
                            className="block py-2 px-3"
                        >
                            Posts
                        </Link>
                    </li>
                </ul>
                {isAuthenticated ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="shadow-none">
                                <User /> {user?.nickname}
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
                                onClick={logout}
                                className="cursor-pointer"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button onClick={login}>Log in</Button>
                )}
            </nav>
        </header>
    )
}
