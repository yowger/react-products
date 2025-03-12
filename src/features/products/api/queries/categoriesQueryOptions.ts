import { queryOptions } from "@tanstack/react-query"

import { getCategories } from "@/features/products/api/requests/categories"
import { CATEGORIES_QUERY_KEY } from "@/features/products/api/queryKeys"
import { time } from "@/lib/utils/time"

export const categoriesQueryOptions = () => {
    queryOptions({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: getCategories,
        staleTime: time.day(7),
    })
}
