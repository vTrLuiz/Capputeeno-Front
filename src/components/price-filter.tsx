"use client"

import styled from "styled-components"
import { useFilter } from "@/app/hooks/use-filter"
import { formatValue } from "@/utils/format-price"

const PRICE_MIN = 0
const PRICE_MAX = 10000

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 180px;
`

const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: var(--text-dark);

    span {
        font-weight: 600;
        color: var(--accent-brown);
    }
`

const RangeInput = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 3px;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    background: linear-gradient(
        to right,
        var(--orange-low) 0%,
        var(--orange-low) var(--pct),
        var(--shapes) var(--pct),
        var(--shapes) 100%
    );

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--accent-brown);
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        transition: transform var(--transition);
    }

    &::-webkit-slider-thumb:hover {
        transform: scale(1.15);
    }

    &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--accent-brown);
        border: 2px solid white;
        cursor: pointer;
    }
`

const Title = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: var(--text-dark);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

export function PriceFilter() {
    const { priceMax, setPriceMax } = useFilter()
    const pct = ((priceMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100

    return (
        <Wrapper>
            <Title>Preço máx.</Title>
            <RangeInput
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={500}
                value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                style={{ '--pct': `${pct}%` } as React.CSSProperties}
            />
            <Label>
                <span>{formatValue(PRICE_MIN)}</span>
                <span>{formatValue(priceMax)}</span>
            </Label>
        </Wrapper>
    )
}
