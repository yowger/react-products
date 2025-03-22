import { createContext } from "react"
import { createContextualCan } from "@casl/react"

import { type AppAbility } from "@/lib/abilities/ability"

export const AbilityContext = createContext<AppAbility>(undefined!)
export const Can = createContextualCan(AbilityContext.Consumer)
