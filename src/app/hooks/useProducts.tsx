"use client"

import { ProductsFetchResponse } from "@/types/products-response"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useFilter } from "./use-filter"
import { mountQuery } from "@/utils/graphql-filters"
import { useDeferredValue, useEffect } from "react"
import { Product } from "@/types/products"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;



const fetcher = async (query : string): Promise<AxiosResponse<ProductsFetchResponse>> => {
  return await axios.get(`${API_URL}/products?${query}`);
};


export function useProducts(){
  const { category, priority, search } = useFilter()
  const searchDeferred = useDeferredValue(search)
  const query = mountQuery(category, priority)
  const { data, refetch } = useQuery({
    queryFn: () => fetcher(query),
    queryKey: ['products', category, priority, searchDeferred],
    staleTime: 1000 * 60 * 1
  })


  useEffect(() => {
    if (searchDeferred.length){
    }
  }, [searchDeferred]);
  
  const products =  data?.data  
  return {
    data: products as Product[] | undefined,
  }
}
