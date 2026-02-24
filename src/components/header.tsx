"use client"
import { Saira_Stencil_One } from 'next/font/google'
import styled from 'styled-components'
import { PrimaryInputWSearchIcon } from './primary-input'
import { CartControl } from './Cart-control';
import { useFilter } from '@/app/hooks/use-filter';
import { useEffect, useState } from 'react';


const sairaStencil = Saira_Stencil_One({
    weight: ['400'],
    subsets: ['latin']
})


interface Headerprops {

}
const TagHeader = styled.header<{ $scrolled: boolean }>`
position: sticky;
top: 0;
z-index: 100;
display: flex;
align-items: center;
justify-content: space-between;
padding: 12px 24px;
background-color: var(--bg-primary);
border-bottom: 1px solid var(--shapes);
transition: box-shadow 200ms ease;
box-shadow: ${({ $scrolled }) => $scrolled ? '0 2px 12px rgba(139, 111, 78, 0.12)' : 'none'};

>div {
    display: flex;  
    align-items: center;
    justify-content: center;
    gap: 24px;
}

@media (min-width: 768px) {
    padding: 20px 80px;
}
`

const Logo = styled.a`
color: var(--logo-color);
font-size: 20px;
font-weight: 400;
line-height: 60px;
text-decoration: none;
letter-spacing: 2px;

@media (min-width: 768px) {
    font-size: 36px;
}
`

export function Header(props: Headerprops) {

    const { setSearch, search } = useFilter();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <TagHeader $scrolled={scrolled}>
            <Logo href='/' className={sairaStencil.className}>Capputeeno</Logo>
            <div>
                <PrimaryInputWSearchIcon
                    value={search}
                    handleChange={setSearch}
                    placeholder="Procurando por algo específico?"
                />
                <CartControl />
            </div>
        </TagHeader>
    )
}
