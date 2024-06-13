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

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 8px;
    }
  }
`

const PriorityFilter = styled.ul`
box-shadow: 0px 4px 12px rgba(0,0,0, 0.1);
width: 180px;
position: absolute;
padding: 12px 16px;
border-radius: 4px;
background: rgb(255, 255, 255);
z-index: 999;
list-style: none;
top: 100%;
right: 8px;

li{
    color: var(--text-dark);
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
}
li + li {
        margin-top: 4px;
    }

`

export function FilterByPriority(props: FilterByPriorityProps) {
    const [isOpen, setIsOpen] = useState(false)
    const {setPriority} = useFilter()
    
    // debugger;
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