"use client"
import { useEffect, useState } from "react"
import styled from "styled-components"

const Btn = styled.button<{ $visible: boolean }>`
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 200;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: var(--accent-brown);
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(139, 111, 78, 0.35);
    transition: opacity 200ms ease, transform 200ms ease, background 200ms ease;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
    transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(12px)')};

    &:hover {
        background: var(--orange-low);
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`

export function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Btn $visible={visible} onClick={scrollToTop} aria-label="Voltar ao topo" title="Voltar ao topo">
            ↑
        </Btn>
    )
}
