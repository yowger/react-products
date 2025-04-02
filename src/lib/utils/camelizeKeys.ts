export const camelizeKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(camelizeKeys)
    } else if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
                camelizeKeys(value),
            ])
        )
    }
    return obj
}
