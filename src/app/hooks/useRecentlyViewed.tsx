"use client"

import { Product } from "@/types/products"
import { useEffect, useState } from "react"

const STORAGE_KEY = "recently-viewed"
const MAX_ITEMS = 5

export function useRecentlyViewed(currentProduct?: Product) {
    const [recents, setRecents] = useState<Product[]>([])

    // Register current product visit
    useEffect(() => {
        if (!currentProduct?.id) return
        try {
            const stored: Product[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
            const filtered = stored.filter(p => p.id !== currentProduct.id)
            const next = [currentProduct, ...filtered].slice(0, MAX_ITEMS)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {}
    }, [currentProduct?.id])

    // Load recents excluding current product
    useEffect(() => {
        try {
            const stored: Product[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
            setRecents(stored.filter(p => p.id !== currentProduct?.id).slice(0, 4))
        } catch {}
    }, [currentProduct?.id])

    return recents
}
