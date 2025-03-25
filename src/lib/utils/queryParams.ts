export function createQueryString(params: Record<string, any>) {
    return Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
}
