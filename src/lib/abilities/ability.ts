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

    if (user) {
        const normalizedRoles = roles.map((role) => role.toLowerCase())

        if (normalizedRoles.includes("admin")) {
            can("manage", "all")
            cannot("delete", "Post")
            cannot("delete", "Comment")
        } else if (normalizedRoles.includes("user")) {
            can(["read", "create"], "Post")
            can(["update", "delete"], "Post", { author_id: user.sub })

            can(["read", "create"], "Comment")
            can("delete", "Comment", { author_id: user.sub })
        }
    } else {
        can("read", "Post")
        can("read", "Comment")
    }

    return build()
}
