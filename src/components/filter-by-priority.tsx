"use client"

import styled from "styled-components"
import { ArrowIcon } from "../app/icon/arrow-icon"
import { useState } from "react"
import { useFilter } from "@/app/hooks/use-filter"
import { PriorityTypes  } from "@/types/priority-types"

interface FilterByPriorityProps {

}

const FilterContainer = styled.div`
display: flex;
    align-items: center;
    position: relative;

  button {
    cursor: pointer;
    background: transparent;
    border: none;

    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-dark);
    transition: color var(--transition);

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover { color: var(--text-dark-2); }

    svg {
      margin-left: 8px;
    }
  }
`

const PriorityFilter = styled.ul`
box-shadow: 0 4px 16px rgba(48, 46, 43, 0.12);
width: 190px;
position: absolute;
padding: 10px 0;
border-radius: var(--border-radius);
border: 1px solid var(--shapes);
background: var(--bg-card);
z-index: 999;
list-style: none;
top: calc(100% + 6px);
right: 0;

li{
    color: var(--text-dark);
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    padding: 6px 16px;
    transition: background var(--transition), color var(--transition);

    &:hover {
        background: var(--bg-secundary);
        color: var(--text-dark-2);
    }
}

`

export function FilterByPriority(props: FilterByPriorityProps) {
    const [isOpen, setIsOpen] = useState(false)
    const {setPriority} = useFilter()
    const handleUpdatePriority = (value : PriorityTypes ) => {
        setPriority(value)
        setIsOpen(false)
    }


    const handleOpen = () => setIsOpen(prev => !prev)
    return (
        <FilterContainer>
            <button onClick={handleOpen} >Organizar por <ArrowIcon /> </button>
            {isOpen && <PriorityFilter>
                <li onClick={() =>  handleUpdatePriority(PriorityTypes.NOVOS)}>Novidade</li>
                <li onClick={() =>  handleUpdatePriority(PriorityTypes.MAIOR_PRECO)}>Preço: Menor - maior</li>
                <li onClick={() =>  handleUpdatePriority(PriorityTypes.MENOR_PREÇO)}>Preço: Maior - menor</li>
                <li onClick={() =>  handleUpdatePriority(PriorityTypes.POPULARIDADE)}>Mais vendidos</li>
            </PriorityFilter>}
        </FilterContainer>
    )
}