import { User } from "@auth0/auth0-react"
import { AbilityBuilder, createMongoAbility, MongoAbility } from "@casl/ability"

import { type Post } from "@/types/post"

export type Actions = "manage" | "read" | "create" | "update" | "delete"
export type Subjects = Post | "Post" | "Comment" | "all"
export type AppAbility = MongoAbility<[Actions, Subjects]>
export type UserRole = "admin" | "user" | "guest"

export default function defineAbilitiesFor(
    user: User | undefined,
    roles: UserRole[]
) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
        createMongoAbility
    )

    if (!user) {
        can("read", ["Post", "Comment"])

        return build()
    }

    const normalizedRoles = roles.map((role) => role.toLowerCase())
    const isAdmin = normalizedRoles.includes("admin")
    const isUser = normalizedRoles.includes("user")

    if (isAdmin) {
        can("manage", "all")
        cannot("update", "Post", {
            "authorId.auth0Id": { $ne: user.sub },
        })
        cannot("update", "Comment", {
            "authorId.auth0Id": { $ne: user.sub },
        })
    }

    if (isUser) {
        can(["read", "create"], "Post")
        can("delete", "Post", {
            "authorId.auth0Id": user.sub,
        })
        can("update", "Post", {
            "authorId.auth0Id": user.sub,
        })

        can(["read", "create"], "Comment")
        can("delete", "Comment", { "authorId.auth0Id": user.sub })
    }

    return build()
}
