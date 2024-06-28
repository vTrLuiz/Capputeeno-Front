"use client"
import { Saira_Stencil_One } from 'next/font/google'
import styled from 'styled-components'
import { PrimaryInputWSearchIcon } from './primary-input'
import { CartControl } from './Cart-control';
import { useFilter } from '@/app/hooks/use-filter';


const sairaStencil = Saira_Stencil_One({
    weight: ['400'],
    subsets: ['latin']
})


interface Headerprops {

}
const TagHeader = styled.header`
display: flex;
align-items: center;
justify-content: space-between;
padding: 12px 24px;

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

@media (min-width: 768px) {
    font-size: 40px;
}
`

export function Header(props: Headerprops) {

    const { setSearch, search } = useFilter();

    return (
        <TagHeader>
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
