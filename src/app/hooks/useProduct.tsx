import { ProductFetchResponse } from "@/types/products";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

const fetcher = async (productId: string): Promise<ProductFetchResponse> => {
    const response = await axios.get(`${API_URL}/product?id=${productId}`);
    return response.data;
};


export function useProduct(id: string) {
    const { data } = useQuery({
        queryFn: () => fetcher(id),
        queryKey: ['product', id],
        enabled: !!id,
        staleTime: 1000 * 60 * 5
    });
    return { data }
}