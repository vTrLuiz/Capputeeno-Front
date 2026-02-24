"use client"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types/products"

const API = "https://api-ecommerce-psn8.onrender.com"

async function fetchByCategory(category: string): Promise<Product[]> {
    const res = await fetch(`${API}/products?category=${encodeURIComponent(category)}`)
    if (!res.ok) throw new Error("Failed to fetch related products")
    const data = await res.json()
    return Array.isArray(data) ? data : data?.data ?? []
}

export function useRelatedProducts(category: string | undefined, currentId: string | undefined) {
    const { data } = useQuery<Product[]>({
        queryKey: ['products', category],
        queryFn: () => fetchByCategory(category!),
        enabled: !!category,
        staleTime: 10 * 60 * 1000,
    })

    if (!data || !currentId) return []
    return data.filter(p => p.id !== currentId).slice(0, 4)
}
