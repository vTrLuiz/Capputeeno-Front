"use client"
import styled, { keyframes } from "styled-components"
import { useCart } from "@/app/contexts/cart-context"
import { formatValue } from "@/utils/format-price"
import { useEffect, useState } from "react"

const FREE_SHIPPING_THRESHOLD = 12000 // R$120 in cents

const slideDown = keyframes`
    from { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; }
    to   { opacity: 1; max-height: 60px; padding-top: 8px; padding-bottom: 8px; }
`

const slideUp = keyframes`
    from { opacity: 1; max-height: 60px; padding-top: 8px; padding-bottom: 8px; }
    to   { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; }
`

const Bar = styled.div<{ $exiting: boolean }>`
    width: 100%;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--shapes);
    padding: 8px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    overflow: hidden;
    animation: ${({ $exiting }) => $exiting ? slideUp : slideDown} 340ms cubic-bezier(0.4, 0, 0.2, 1) both;

    @media (min-width: 768px) {
        padding: 8px 80px;
    }
`

const Label = styled.span`
    font-size: 12px;
    color: var(--text-dark);
    white-space: nowrap;
    min-width: 0;
`

const Track = styled.div`
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: var(--shapes);
    overflow: hidden;
`

const Fill = styled.div<{ $pct: number; $done: boolean }>`
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    border-radius: 3px;
    background: ${({ $done }) => ($done ? 'var(--buy-color)' : 'var(--orange-low)')};
    transition: width 400ms ease, background 400ms ease;
`

export function FreeShippingBar() {
    const { items } = useCart()
    const hasItems = items.length > 0
    const [visible, setVisible] = useState(hasItems)
    const [exiting, setExiting] = useState(false)

    useEffect(() => {
        if (hasItems) {
            setExiting(false)
            setVisible(true)
        } else if (visible) {
            setExiting(true)
            const t = setTimeout(() => setVisible(false), 340)
            return () => clearTimeout(t)
        }
    }, [hasItems])

    if (!visible) return null

    const total = items.reduce((sum, i) => sum + i.price_in_cents * i.quantity, 0)
    const pct = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)
    const done = total >= FREE_SHIPPING_THRESHOLD
    const remaining = FREE_SHIPPING_THRESHOLD - total

    return (
        <Bar $exiting={exiting}>
            <Label>
                {done
                    ? '🎉 Frete grátis conquistado!'
                    : `Faltam ${formatValue(remaining)} para frete grátis`}
            </Label>
            <Track>
                <Fill $pct={pct} $done={done} />
            </Track>
        </Bar>
    )
}
