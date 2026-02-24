/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { formatValue } from "@/utils/format-price"
import { useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/cart-context";
import { Product } from "@/types/products";
import styled, { keyframes } from "styled-components"
import { Divider } from "./divider";

interface ProductCardProps {
    product: Product
}

const popIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

const ImageWrapper = styled.div`
    position: relative;
    width: 256px;
    height: 300px;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
`

const AddToCartBtn = styled.button`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
    background: rgba(48, 46, 43, 0.82);
    backdrop-filter: blur(4px);
    color: #F7F5F0;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity var(--transition);
    animation: ${popIn} 150ms ease;
`

const BadgeRow = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    gap: 6px;
    pointer-events: none;
`

const Badge = styled.span<{ variant: 'hot' | 'new' }>`
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 3px 8px;
    border-radius: 3px;
    color: white;
    background: ${p => p.variant === 'hot' ? 'var(--orange-low)' : 'var(--buy-color)'};
`

const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background: var(--bg-card);
    border: 1px solid var(--shapes);
    border-radius: 4px;
    overflow: hidden;

    width: 256px;
    cursor: pointer;
    transition: transform var(--transition), box-shadow var(--transition);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 24px rgba(48, 46, 43, 0.10);
    }

    &:hover ${AddToCartBtn} {
        opacity: 1;
    }

    h3 {
        font-weight: 300;
        font-size: 16px;
        line-height: 150%;
        color: var(--text-dark-2);
    }

    p {
        font-weight: 600;
        font-size: 14px;
        line-height: 150%;
        color: var(--accent-brown);
    }

    > div {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        padding: 10px 14px;
        width: 100%;
    }
`

const SIX_MONTHS_AGO = new Date()
SIX_MONTHS_AGO.setMonth(SIX_MONTHS_AGO.getMonth() - 6)

export function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const { addToCart, items } = useCart();

    const isHot = (product.sales ?? 0) >= 30
    const isNew = product.created_at
        ? new Date(product.created_at) >= SIX_MONTHS_AGO
        : false
    const inCart = items.some(i => i.id === product.id)

    const handleNavigate = () => router.push(`/product?id=${product.id}`)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation()
        addToCart(product)
    }

    return (
        <Card onClick={handleNavigate}>
            <ImageWrapper>
                <img src={product.image_url} alt={product.name} />
                <BadgeRow>
                    {isHot && <Badge variant="hot">Em Alta</Badge>}
                    {isNew && <Badge variant="new">Novo</Badge>}
                </BadgeRow>
                <AddToCartBtn onClick={handleAddToCart}>
                    {inCart ? '+ Adicionar mais' : 'Adicionar ao carrinho'}
                </AddToCartBtn>
            </ImageWrapper>
            <div>
                <h3>{product.name}</h3>
                <Divider />
                <p>{formatValue(product.price_in_cents)}</p>
            </div>
        </Card>
    )
}