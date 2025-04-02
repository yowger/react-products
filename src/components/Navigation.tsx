import { useAuth0, type User } from "@auth0/auth0-react"
import { Link } from "@tanstack/react-router"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
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

interface AuthMenuProps {
    user: User | undefined
    onLogout: () => void
}

export default function Navigation() {
    const { user, isAuthenticated } = useAuth0()
    const login = useLogin()
    const logout = useLogout()

    return (
        <header className="border-b bg-neutral-50">
            <nav className="px-4 py-2 flex items-center justify-between flex-wrap mx-auto max-w-7xl">
                <Logo width={60} height={34} />
                <ul className="flex p-4 font-medium">
                    <li>
                        <Link
                            to="/"
                            activeProps={{ className: "font-semibold" }}
                            className="block py-2 px-6 text-lg"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/posts"
                            activeProps={{ className: "font-semibold" }}
                            className="block py-2 px-6 text-lg"
                        >
                            Posts
                        </Link>
                    </li>
                </ul>
                {isAuthenticated ? (
                    <AuthMenu user={user} onLogout={logout} />
                ) : (
                    <Button onClick={login}>Log in</Button>
                )}
            </nav>
        </header>
    )
}

function AuthMenu(props: AuthMenuProps) {
    const { user, onLogout } = props
    const userAvatar = user?.picture ?? ""
    const userName = user?.name ?? "User"
    const fallbackName = user?.name?.charAt(0).toUpperCase() ?? "A"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="shadow-none">
                    <div className="flex space-x-2 items-center">
                        <Avatar className="size-10">
                            <AvatarImage src={userAvatar} alt={userName} />
                            <AvatarFallback>{fallbackName}</AvatarFallback>
                        </Avatar>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        to="/profile"
                        activeProps={{ className: "font-semibold" }}
                    >
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
