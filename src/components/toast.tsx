"use client"

import { useEffect } from "react"
import styled, { keyframes } from "styled-components"

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`

const ToastWrapper = styled.div`
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 9999;
    background: var(--text-dark-2);
    color: #F7F5F0;
    padding: 14px 22px;
    border-radius: var(--border-radius);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
    box-shadow: 0 8px 24px rgba(48, 46, 43, 0.22);
    animation: ${slideIn} 220ms ease forwards;
    display: flex;
    align-items: center;
    gap: 10px;

    span.dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--buy-color);
        flex-shrink: 0;
    }
`

interface ToastProps {
    message: string
    onClose: () => void
    duration?: number
}

export function Toast({ message, onClose, duration = 2500 }: ToastProps) {
    useEffect(() => {
        const t = setTimeout(onClose, duration)
        return () => clearTimeout(t)
    }, [onClose, duration])

    return (
        <ToastWrapper>
            <span className="dot" />
            {message}
        </ToastWrapper>
    )
}
