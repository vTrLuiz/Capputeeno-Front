"use client"
import styled, { keyframes } from "styled-components"
import { useCart } from "@/app/contexts/cart-context"
import { formatValue } from "@/utils/format-price"
import { DeleteIcon } from "@/app/icon/delete-icon"
import { useRouter } from "next/navigation"

const Overlay = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    z-index: 300;
    background: rgba(0, 0, 0, 0.35);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity 280ms ease;
`

const Drawer = styled.aside<{ $open: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 301;
    width: min(420px, 100vw);
    background: var(--bg-primary);
    display: flex;
    flex-direction: column;
    transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -4px 0 32px rgba(0,0,0,0.12);
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid var(--shapes);

    h3 {
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--text-dark);
    }
`

const CloseBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 22px;
    color: var(--text-dark);
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 140ms ease;
    line-height: 1;

    &:hover { background: var(--shapes); }
`

const ItemsList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Item = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;

    img {
        width: 72px;
        height: 72px;
        object-fit: cover;
        border-radius: var(--border-radius);
        border: 1px solid var(--shapes);
    }
`

const ItemInfo = styled.div`
    flex: 1;
    min-width: 0;

    p {
        font-size: 13px;
        font-weight: 500;
        color: var(--text-dark);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span {
        font-size: 12px;
        color: var(--text-medium);
        margin-top: 2px;
        display: block;
    }
`

const QtyRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;

    button {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        border: 1px solid var(--shapes);
        background: var(--bg-secondary);
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 140ms;

        &:hover { background: var(--shapes); }
        &:disabled { opacity: 0.4; cursor: not-allowed; }
    }

    span {
        font-size: 13px;
        font-weight: 600;
        min-width: 20px;
        text-align: center;
        color: var(--text-dark);
    }
`

const RemoveBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    padding: 4px;
    transition: opacity 140ms;
    display: flex;

    &:hover { opacity: 1; }
`

const Footer = styled.div`
    padding: 20px 24px;
    border-top: 1px solid var(--shapes);
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const TotalRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 14px;
        color: var(--text-dark);
        font-weight: 500;
    }

    strong {
        font-size: 18px;
        color: var(--accent-brown);
        font-weight: 600;
    }
`

const CheckoutBtn = styled.button`
    background: var(--buy-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity var(--transition), transform var(--transition);

    &:hover { opacity: 0.88; transform: translateY(-1px); }
`

const CartPageBtn = styled.button`
    background: none;
    border: 1px solid var(--shapes);
    border-radius: var(--border-radius);
    padding: 10px;
    font-size: 13px;
    color: var(--text-dark);
    cursor: pointer;
    transition: background 140ms;

    &:hover { background: var(--shapes); }
`

const EmptyMsg = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--text-medium);
    font-size: 14px;

    span { font-size: 40px; }
`

export function CartDrawer() {
    const { items, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart } = useCart()
    const router = useRouter()

    const total = items.reduce((sum, i) => sum + i.price_in_cents * i.quantity, 0)

    const goToCart = () => {
        closeDrawer()
        router.push('/cart')
    }

    return (
        <>
            <Overlay $open={isDrawerOpen} onClick={closeDrawer} />
            <Drawer $open={isDrawerOpen} aria-label="Carrinho">
                <Header>
                    <h3>Carrinho</h3>
                    <CloseBtn onClick={closeDrawer} aria-label="Fechar">✕</CloseBtn>
                </Header>

                {items.length === 0 ? (
                    <EmptyMsg>
                        <span>🛍️</span>
                        <p>Seu carrinho está vazio</p>
                    </EmptyMsg>
                ) : (
                    <ItemsList>
                        {items.map(item => (
                            <Item key={item.id}>
                                <img src={item.image ?? item.image_url} alt={item.name} />
                                <ItemInfo>
                                    <p>{item.name}</p>
                                    <span>{formatValue(item.price_in_cents * item.quantity)}</span>
                                    <QtyRow>
                                        <button
                                            disabled={item.quantity <= 1}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </QtyRow>
                                </ItemInfo>
                                <RemoveBtn onClick={() => removeFromCart(item.id)} aria-label="Remover">
                                    <DeleteIcon />
                                </RemoveBtn>
                            </Item>
                        ))}
                    </ItemsList>
                )}

                {items.length > 0 && (
                    <Footer>
                        <TotalRow>
                            <span>Total</span>
                            <strong>{formatValue(total)}</strong>
                        </TotalRow>
                        <CheckoutBtn>Finalizar compra</CheckoutBtn>
                        <CartPageBtn onClick={goToCart}>Ver carrinho completo →</CartPageBtn>
                    </Footer>
                )}
            </Drawer>
        </>
    )
}
