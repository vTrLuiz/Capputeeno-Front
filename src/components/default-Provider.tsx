"use client"

import { FilterContextProvider } from "@/app/contexts/filter-context";
import { CartContextProvider } from "@/app/contexts/cart-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { useState } from "react";

interface DefaultProvidersProps {
children: React.ReactNode;
}

const theme = {
    };

export function DefaultProviders({children} : DefaultProvidersProps){
    const [client] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime:  10 * 60 * 1000,  // 10 min — data is fresh, no background refetch
                gcTime:     60 * 60 * 1000,  // 60 min — keep cache in memory even after unmount
                refetchOnWindowFocus: false,  // don't refetch just because user switches tabs
                retry: 1,
            },
        },
    }))
    return(
        <QueryClientProvider client={client}>
            <FilterContextProvider>
                <CartContextProvider>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </CartContextProvider>
            </FilterContextProvider>
        </QueryClientProvider>
    )
}