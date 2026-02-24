import styled from "styled-components"
import { useCart } from "@/app/contexts/cart-context"
import { CartIcon } from "../app/icon/cart-icon";


const CartCount = styled.span`
    width: 18px;
    height: 18px;
    border-radius: 100%;
    padding: 0px 5px;
    font-size: 11px;
    font-weight: 600;
    background-color: var(--orange-low);
    color: #fff;
    margin-left: -8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`

const Container = styled.div`
    position: relative;
    right: -10px;
    top: 50%;
    cursor: pointer;
    border: none;
    background: transparent;
`

export function CartControl(){
    const { items, openDrawer } = useCart()
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

    return (
        <Container onClick={openDrawer} title="Abrir carrinho">
            <CartIcon/>
            {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
        </Container>
    )
}