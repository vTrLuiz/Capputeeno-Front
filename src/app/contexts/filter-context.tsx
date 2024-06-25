"use client"

import { ReactNode, createContext , useState } from "react";
import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";
export const FilterContext = createContext({
    search: "",
    page: 0,
    category: FilterType.ALL,
    priority: PriorityTypes.NOVOS,
    setPriority: (value: PriorityTypes ) => {},
    setSearch: (value: string) => {},
    setPage: (value: number) => {},
    setCategory: (value: FilterType) => {},
})

interface ProviderProps {
    children: ReactNode
}

export function FilterContextProvider({ children }: ProviderProps){
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [category, setCategory] = useState(FilterType.ALL)
    const [priority, setPriority] = useState(PriorityTypes.POPULARIDADE)

    return(
        <FilterContext.Provider
            value={{
                search, 
                page, category, 
                setSearch, 
                setCategory, 
                setPage,
                priority,
                setPriority
            }}>
            {children}
        </FilterContext.Provider>
    )
}