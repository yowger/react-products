import { Link, useRouteContext } from "@tanstack/react-router"

export default function Navigation() {
    const isAuthenticated = useRouteContext({
        from: "__root__",
        select: (context) => context.isAuthenticated,
    })

    return (
        <div className="flex items-center justify-center">
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
                <li>
                    {isAuthenticated ? (
                        <Link
                            to="/profile"
                            activeProps={{
                                className: "font-semibold",
                            }}
                            className="block py-2 px-3"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            activeProps={{
                                className: "font-semibold",
                            }}
                            className="block py-2 px-3"
                        >
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    )
}
