import { QueryKey } from "@tanstack/react-query"

export const POSTS_QUERY_KEY: QueryKey = ["posts"]

export const postQueryKey = (id: string): QueryKey => [...POSTS_QUERY_KEY, id]
