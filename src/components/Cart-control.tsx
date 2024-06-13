import styled from "styled-components"
import { useLocalStorage } from "@/app/hooks/useLocalStorage"
import { useRouter } from "next/navigation";
import { CartIcon } from "../app/icon/cart-icon";


const CartCount = styled.span`
    width: 17px;
    height: 17px;
    border-radius: 100%;
    padding: 0px 5px;
    font-size: 12px;
    background-color: var(--delete-color);
    color: white;
    margin-left: -8px;

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
    const router = useRouter()
    const { value } = useLocalStorage('cart-items', [])

    const handleNavigateToCart = () => {
        router.push("/cart")
    }

    return (
        <Container onClick={handleNavigateToCart}>
            <CartIcon/>
            {value.length > 0 && <CartCount>{value.length}</CartCount>}
        </Container>
    )
}