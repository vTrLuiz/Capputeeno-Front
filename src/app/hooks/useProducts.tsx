"use client"

import { ProductsFetchResponse } from "@/types/products-response"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useFilter } from "./use-filter"
import { mountQuery } from "@/utils/graphql-filters"
import { useDeferredValue } from "react"
import { Product } from "@/types/products"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;



const fetcher = async (query : string): Promise<AxiosResponse<ProductsFetchResponse>> => {
  return await axios.get(`${API_URL}/products?${query}`);
};


export function useProducts(){
  const { category, priority, search, priceMax } = useFilter()
  const searchDeferred = useDeferredValue(search)
  const query = mountQuery(category, priority)
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(query),
    queryKey: ['products', category, priority],
    staleTime: 10 * 60 * 1000,
  })

  const allProducts = data?.data as Product[] | undefined

  const products = allProducts
    ?.filter(p => p.price_in_cents <= priceMax)
    .filter(p =>
      !searchDeferred.trim() ||
      p.name.toLowerCase().includes(searchDeferred.toLowerCase().trim())
    )

  return {
    data: products,
    isLoading,
  }
}
