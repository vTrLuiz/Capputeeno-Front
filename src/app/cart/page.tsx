"use client";

import styled from "styled-components";
import { BackBtn } from "@/components/Back-button";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { useCart } from "../contexts/cart-context";
import { formatValue } from "@/utils/format-price";
import { CartItem } from "@/components/Cart/cart-item";
import { Divider } from "@/components/divider";
import { EmptyState } from "@/components/empty-state";
import Link from "next/link";



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
        font-size: 22px;
        font-weight: 500;
        line-height: 150%;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--text-dark-2);
        margin-top: 24px;
    }

    p {
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;
        color: var(--text-dark);

        span {
            font-weight: 600;
            color: var(--accent-brown);
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
    padding: 24px 28px;
    margin-top: 1px;

    background: var(--bg-card);
    border: 1px solid var(--shapes);
    border-radius: var(--border-radius);

    h3 {
        font-weight: 600;
        font-size: 18px;
        color: var(--text-dark-2);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 24px;
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
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 15px;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: opacity var(--transition), transform var(--transition);

    &:hover {
        opacity: 0.88;
        transform: translateY(-1px);
    }

`

const EmptyCartButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 32px;
    background: var(--buy-color);
    color: white;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 1px;
    text-decoration: none;
    transition: opacity var(--transition);
    &:hover { opacity: 0.88; }
`

export default function CartPage() {
    const { items, removeFromCart, updateQuantity } = useCart()

    const calculateTotal = () =>
        items.reduce((sum, item) => sum + item.price_in_cents * item.quantity, 0)

    const subtotal = calculateTotal()
    const total = formatValue(subtotal)
    const FREE_SHIPPING_THRESHOLD = 12000
    const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
    const taxaEntrega = freeShipping ? 0 : 4000
    const entrega = formatValue(subtotal + taxaEntrega)
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

    return (
        <DefaultPageLayout>
            {items.length === 0 ? (
                <EmptyState
                    icon="🛍️"
                    title="Seu carrinho está vazio"
                    subtitle="Explore nossos produtos e adicione o que você curtir."
                    action={<EmptyCartButton href="/">Ver produtos</EmptyCartButton>}
                />
            ) : (
            <Container>
                <CartListContainer>
                    <BackBtn navigate="/" />
                    <h3>Seu Carrinho</h3>
                    <p>
                        Total de {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                        <span> {total} </span>
                    </p>

                    <CartList>
                        {items.map(item =>
                            <CartItem
                                product={item}
                                key={item.id}
                                handleDelete={removeFromCart}
                                handleUpdateQuantity={updateQuantity}
                            />)}
                    </CartList>
                </CartListContainer>
                <CartResume>
                    <h3>Resumo do Pedido</h3>
                    <TotalCart isBold={false}>
                        <p>Subtotal de produtos</p>
                        <span>{total}</span>
                    </TotalCart>
                    <TotalCart isBold={false}>
                        <p>Entrega</p>
                        <span style={freeShipping ? { color: 'var(--buy-color)', fontWeight: 600 } : undefined}>
                            {freeShipping ? 'Grátis 🎉' : formatValue(taxaEntrega)}
                        </span>
                    </TotalCart>
                    <Divider />
                    <TotalCart isBold={true}>
                        <p>Total</p>
                        <span>{entrega}</span>
                    </TotalCart>
                    <BuyButton>
                        Finalizar A Compra
                    </BuyButton>
                </CartResume>
            </Container>
            )}
        </DefaultPageLayout>
    )
}
