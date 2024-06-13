"use client"

import { FilterContextProvider } from "@/app/contexts/filter-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";

interface DefaultProvidersProps {
children: React.ReactNode;
}

const theme = {
    };

export function DefaultProviders({children} : DefaultProvidersProps){
    const client = new QueryClient();
    return(
        <QueryClientProvider client={new QueryClient}>
            <FilterContextProvider>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </FilterContextProvider>
        </QueryClientProvider>
    )
}