"use client"
import { DefaultPageLayout } from "@/components/default-page-layout"
import styled from "styled-components"
import { BackBtn } from "@/components/Back-button"
import { useProduct } from "../hooks/useProduct"
import { formatValue } from "@/utils/format-price"
import { BagIcon } from "../icon/bag-icon"
import { useCart } from "../contexts/cart-context"
import { Toast } from "@/components/toast"
import { ProductDetailSkeleton } from "@/components/product-detail-skeleton"
import { ProductCard } from "@/components/product-card"
import { useRecentlyViewed } from "../hooks/useRecentlyViewed"
import { useRelatedProducts } from "../hooks/useRelatedProducts"
import { useState, useCallback, use } from "react"
import Link from "next/link"


const Breadcrumb = styled.nav`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-medium);
    margin-bottom: 12px;
    flex-wrap: wrap;

    a {
        color: var(--text-medium);
        text-decoration: none;
        transition: color 140ms;
        &:hover { color: var(--accent-brown); }
    }

    span.sep { opacity: 0.5; }

    span.current {
        color: var(--text-dark);
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
    }
`

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    section {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 32px;
        margin-top: 24px;

        > div {
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            button {
                background: var(--buy-color);
                border-radius: var(--border-radius);
                color: white;
                border: none;
                cursor: pointer;
                padding: 12px 0;
                text-align: center;
                font-weight: 500;
                font-size: 15px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                transition: opacity var(--transition), transform var(--transition);

                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;

                &:hover {
                    opacity: 0.88;
                    transform: translateY(-1px);
                }
            }
        }
    }
`

const ImageWrapper = styled.div`
    max-width: 640px;
    width: 50%;
    overflow: hidden;
    border-radius: var(--border-radius);
    cursor: zoom-in;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 400ms ease;
    }

    &:hover img {
        transform: scale(1.06);
    }
`

const QtySelector = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid var(--shapes);
    border-radius: var(--border-radius);
    overflow: hidden;
    width: fit-content;
    margin-bottom: 12px;

    button {
        background: var(--bg-secondary) !important;
        border: none !important;
        color: var(--text-dark) !important;
        width: 36px !important;
        height: 36px !important;
        font-size: 18px !important;
        padding: 0 !important;
        letter-spacing: 0 !important;
        text-transform: none !important;
        cursor: pointer;
        transition: background 140ms !important;
        transform: none !important;
        border-radius: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;

        &:hover {
            background: var(--shapes) !important;
            opacity: 1 !important;
            transform: none !important;
        }

        &:disabled {
            opacity: 0.4 !important;
            cursor: not-allowed !important;
        }
    }

    span {
        min-width: 40px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--text-dark);
        user-select: none;
    }
`

const RelatedSection = styled.div`
    width: 100%;
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid var(--shapes);

    h4 {
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--text-dark);
        margin-bottom: 24px;
    }

    > div {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
    }
`

const ProductInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    span {
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        color: var(--text-dark);
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    h2 {
        font-weight: 300;
        font-size: 32px;
        line-height: 150%;
        color: var(--text-dark-2);
        margin-top: 8px;
    }

    span:nth-of-type(2){
        font-weight: 600;
        font-size: 20px;
        color: var(--accent-brown);
        margin-bottom: 24px;
        letter-spacing: 0;
    }

    p {
        font-weight: 400;
        font-size: 12px;
        color: var(--text-dark);
    }

    div {
        margin-top: 24px;

        h3 {
            text-transform: uppercase;
            color: var(--text-dark-2);
            font-weight: 500;
            font-size: 14px;
            letter-spacing: 1px;
        }

        p {
            font-size: 14px;
            margin-top: 8px;
            line-height: 170%;
        }
    }
`

const RecentSection = styled.div`
    width: 100%;
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid var(--shapes);

    h4 {
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        color: var(--text-dark);
        margin-bottom: 24px;
    }

    > div {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
    }
`

export default function Product({ searchParams }: { searchParams: Promise<{ id: string }> }) {
    const { id } = use(searchParams)
    const { data, isLoading } = useProduct(id)
    const { addToCart, items } = useCart()
    const recents = useRecentlyViewed(data)
    const related = useRelatedProducts(data?.category, id)
    const [toast, setToast] = useState(false)
    const [qty, setQty] = useState(1)

    const handleCloseToast = useCallback(() => setToast(false), [])

    const cartItem = items.find(i => i.id === id)
    const inCartQty = cartItem?.quantity ?? 0

    const handleaddToCart = () => {
        if (!data) return
        addToCart(data, qty)
        setQty(1)
        setToast(true)
    }

    const categoryLabel = data?.category ?? ''

    return (
        <DefaultPageLayout>
            <Container>
                {!isLoading && data && (
                    <Breadcrumb>
                        <Link href="/">Início</Link>
                        <span className="sep">›</span>
                        <Link href={`/?category=${encodeURIComponent(categoryLabel)}`}>{categoryLabel}</Link>
                        <span className="sep">›</span>
                        <span className="current">{data.name}</span>
                    </Breadcrumb>
                )}
                <BackBtn navigate="/" />
                {isLoading ? (
                    <ProductDetailSkeleton />
                ) : (
                    <section>
                        <ImageWrapper>
                            <img src={data?.image_url} alt={data?.name} />
                        </ImageWrapper>
                        <div>
                            <ProductInfo>
                                <span>{data?.category}</span>
                                <h2>{data?.name}</h2>
                                <span>{formatValue(data?.price_in_cents ?? 0)}</span>
                                <p>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$120,00.</p>
                                <div>
                                    <h3>Descrição</h3>
                                    <p>{data?.description}</p>
                                </div>
                            </ProductInfo>
                            <div>
                                <QtySelector>
                                    <button disabled={qty <= 1} onClick={() => setQty(q => q - 1)}>−</button>
                                    <span>{qty}</span>
                                    <button onClick={() => setQty(q => q + 1)}>+</button>
                                </QtySelector>
                                <button onClick={handleaddToCart}>
                                    <BagIcon />
                                    {inCartQty > 0
                                        ? `Adicionar mais (${inCartQty} no carrinho)`
                                        : 'Adicionar ao carrinho'}
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </Container>
            {related.length > 0 && (
                <RelatedSection>
                    <h4>Produtos relacionados</h4>
                    <div>
                        {related.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </RelatedSection>
            )}
            {recents.length > 0 && (
                <RecentSection>
                    <h4>Vistos recentemente</h4>
                    <div>
                        {recents.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </RecentSection>
            )}
            {toast && (
                <Toast
                    message={`"${data?.name}" adicionado ao carrinho`}
                    onClose={handleCloseToast}
                />
            )}
        </DefaultPageLayout>
    )
}
