"use client"

import { useFilter } from "@/app/hooks/use-filter";
import { FilterType } from "@/types/filter-types";
import styled from "styled-components";


interface FilterItemProps{
    selected: boolean;
}

const FilterList = styled.ul`
display: flex;
align-items: center;
justify-content: center;
gap: 32px;
list-style: none;
`

const FilterItem = styled.li<FilterItemProps>`
    color: var(--text-dark);
    text-transform: uppercase;
    text-align: center;
    font-family: inherit;
    font-weight: ${props => props.selected ? '600' : '400'};
    font-size: 12px;
    line-height: 18px;
    padding-bottom: 6px;
    border-bottom: ${props => props.selected ? '3px solid var(--orange-low)' : '3px solid transparent'};
    cursor: pointer;
    transition: color var(--transition), border-color var(--transition);

    &:hover {
        color: var(--text-dark-2);
    }

    @media(min-width: 768px){
        font-size: 16px;
        line-height: 22px;
    }
    
`


export function FilterByType(){
    const {category, setCategory} = useFilter();

    const handleChangeType = (value: FilterType) => {
        setCategory(value)
    }
    return(
        <FilterList>
            <FilterItem selected={category === FilterType.ALL} onClick={() =>  handleChangeType(FilterType.ALL)}>Todos os produtos</FilterItem>
            <FilterItem selected={category === FilterType.SHIRT} onClick={() => handleChangeType(FilterType.SHIRT)}>Camisetas</FilterItem>
            <FilterItem selected={category === FilterType.MUGS} onClick={() => handleChangeType(FilterType.MUGS)}>Canecas</FilterItem>
        </FilterList>
    )
}
