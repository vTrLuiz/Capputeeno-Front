"use client";

import styled from "styled-components";
import { BackBtn } from "@/components/Back-button";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ProductInCart } from "@/types/products";
import { formatValue } from "@/utils/format-price";
import { CartItem } from "@/components/Cart/cart-item";
import { Divider } from "@/components/divider";



const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    gap: 32px;

    @media (max-width: 1200px) {
        flex-direction: column;
    
    }
`

const CartListContainer = styled.div`

  h3 {
        font-size: 24px;
        font-weight: 500;
        line-height: 150%;
        text-transform: uppercase;
        color: var(--text-dark-2);
        margin-top: 24px;
    }

    p {
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;
        color: var(--text-dark-2);

        span {
            font-weight: 600;
        }
    }
`;

const CartList = styled.ul`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
`;

const CartResume = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 352px;
    padding: 16px 24px;
    margin-top: 1px;

    background: white;

    h3 {
        font-weight: 600;
        font-size: 20px;
        color: var(--text-dark-2);
        text-transform: uppercase;
        margin-bottom: 30px;
    }
`;

const TotalCart = styled.div <{isBold : boolean}> `
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    margin-bottom: 12px;
    p{
        font-size: 16px;
        font-weight: ${props => props.isBold ? 600 : 400};
        color: var(--text-dark-2);

    }
    span{
        font-size: 16px;
        font-weight: ${props => props.isBold ? 600 : 400};
        color: var(--text-dark-2);
    }
    
    `;

const BuyButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    margin-top: 24px;
    width: 100%;
    height: 44px;
    background: var(--buy-color);
    border: none;
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    color: white;
    text-transform: uppercase;
    cursor: pointer;


`

export default function CartPage() {
    const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>('cart-items', [])

    const calculateTotal = (value: ProductInCart[]) => {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
    }
    const total = formatValue(calculateTotal(value))

    const taxaEntrega = 4000
    
    const entrega = formatValue(calculateTotal(value) + taxaEntrega);

    const handleUpdateQuantity = (id: number, quantity: number) => {
        const newValue = value.map(item => {
            if (String(id) === item.id.toString()) {
                return { ...item, quantity }
            }
            return item
        }
        )
        updateLocalStorage(newValue)
    }
    const handleRemoveItem = (id: string) => {
        const newValue = value.filter(item => {
            if (item.id !== id) return item
        })
        updateLocalStorage(newValue)
    }

    return (
        <DefaultPageLayout>
            <Container>
                <CartListContainer>
                    <BackBtn navigate="/" />
                    <h3>Seu Carrinho</h3>
                    <p>
                        Total de {value.length} itens
                        <span> {total} </span>
                    </p>

                    <CartList>
                        {value.map(item =>
                            <CartItem
                                product={item}
                                key={item.id}
                                handleDelete={handleRemoveItem}
                                handleUpdateQuantity={handleUpdateQuantity}
                            />)}
                    </CartList>
                </CartListContainer>
                <CartResume>
                    <h3>Resumo do Pedido</h3>
                    <TotalCart isBold={false}>
                        <p>
                            Subtotal de produtos
                        </p>
                        <span>{total}</span>

                        </TotalCart>
                        <TotalCart isBold={false} >
                        <p>
                            Entrega
                        </p>
                        <span>{formatValue(taxaEntrega)}</span>
                    </TotalCart>
                    <Divider />
                    <TotalCart isBold={true}>
                        <p>
                            Total
                        </p>
                        <span> {entrega}</span>
                    </TotalCart>
                    <BuyButton>
                        Finalizar A Compra
                    </BuyButton>
                </CartResume>
            </Container>
        </DefaultPageLayout>
    )
}
