import { create } from "zustand"

type FilterState = {
    category: string | null
    setCategory: (category: string | null) => void
}

export const useFilterStore = create<FilterState>()((set) => ({
    category: null,
    setCategory: (category) => set({ category }),
}))
