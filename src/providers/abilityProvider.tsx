import { type AppAbility } from "@/lib/abilities/ability"
import { AbilityContext } from "@/lib/abilities/abilityContext"

interface AbilityProviderProps extends React.PropsWithChildren {
    ability: AppAbility
}

export default function AbilityProvider(props: AbilityProviderProps) {
    const { ability, children } = props

    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    )
}
