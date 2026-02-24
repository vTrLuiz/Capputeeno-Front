"use client"

import { Product, ProductInCart } from "@/types/products"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const STORAGE_KEY = "cart-items"

interface CartContextValue {
    items: ProductInCart[]
    addToCart: (product: Product, qty?: number) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    isDrawerOpen: boolean
    openDrawer: () => void
    closeDrawer: () => void
}

export const CartContext = createContext<CartContextValue>({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    isDrawerOpen: false,
    openDrawer: () => {},
    closeDrawer: () => {},
})

export function useCart() {
    return useContext(CartContext)
}

export function CartContextProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ProductInCart[]>([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) setItems(JSON.parse(stored))
        } catch {}
    }, [])

    const persist = (next: ProductInCart[]) => {
        setItems(next)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }

    const addToCart = (product: Product, qty: number = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id)
            const next = existing
                ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
                : [...prev, { ...product, image: product.image_url, quantity: qty }]
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
            return next
        })
    }

    const removeFromCart = (id: string) => {
        persist(items.filter(i => i.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        persist(items.map(i => i.id === id ? { ...i, quantity } : i))
    }

    const openDrawer = () => setIsDrawerOpen(true)
    const closeDrawer = () => setIsDrawerOpen(false)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, isDrawerOpen, openDrawer, closeDrawer }}>
            {children}
        </CartContext.Provider>
    )
}
