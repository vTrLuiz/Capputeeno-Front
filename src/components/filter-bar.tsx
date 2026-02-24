"use client"

import styled from "styled-components";
import { FilterByType } from "./filter-by-type";
import { FilterByPriority } from "./filter-by-priority";
import { PriceFilter } from "./price-filter";

const FilterContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
`

export function FilterBar(){
    return(
        <FilterContainer>
            <FilterByType/>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <PriceFilter />
                <FilterByPriority/>
            </div>
        </FilterContainer>
    )
}