"use client"

import { ProductsFetchResponse } from "@/types/products-response"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosPromise, AxiosResponse } from "axios"
import { useFilter } from "./use-filter"
import { mountQuery } from "@/utils/graphql-filters"
import { Component, useDeferredValue, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;



const fetcher = (query : string): Promise<AxiosResponse<ProductsFetchResponse>> => {
  return axios.get(`${API_URL}/products?${query}`);
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
    refetch();
  }, [searchDeferred]);
  
  const products =  data?.data  
  return {
    data: products
  }
}
