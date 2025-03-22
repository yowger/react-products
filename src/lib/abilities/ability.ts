import { AbilityBuilder, createMongoAbility, MongoAbility } from "@casl/ability"

export type Actions = "manage" | "read" | "create" | "update" | "delete"
export type Subjects = "Post" | "Comment" | "all"
export type AppAbility = MongoAbility<[Actions, Subjects]>

export default function defineAbilitiesFor(user: any | undefined) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

    if (user?.role === "admin") {
        can("manage", "all")
    } else if (user?.role === "user") {
        can("read", "Post")
        can("create", "Post")
        can("update", "Post", { author_id: user.sub })
        can("delete", "Post", { author_id: user.sub })

        can("read", "Comment")
        can("create", "Comment")
        can("delete", "Comment", { author_id: user.sub })
    } else {
        can("read", "Post")
        can("read", "Comment")
    }

    return build()
}
