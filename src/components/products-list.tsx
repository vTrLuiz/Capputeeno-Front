"use client"


import { useProducts } from "@/app/hooks/useProducts"
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";
import { EmptyState } from "./empty-state";
import { useFilter } from "@/app/hooks/use-filter";
import styled from "styled-components";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 256px);
  grid-gap: 32px;
  max-width: 100%;
  margin-top: 32px;
`

export function ProductsList(){
    const { data, isLoading } = useProducts();
    const { search } = useFilter();

    if (isLoading) {
        return (
            <ListContainer>
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </ListContainer>
        )
    }

    if (!data?.length) {
        return (
            <EmptyState
                icon="🔍"
                title={search.trim() ? `Nenhum resultado para "${search}"` : "Nenhum produto encontrado"}
                subtitle={search.trim() ? "Tente buscar por outro termo ou explore as categorias." : "Volte em breve, estamos atualizando o estoque."}
            />
        )
    }

    return(
        <ListContainer>{data.map(product => 
        <ProductCard
            key={product.id}
            product={product}
        />)}
        </ListContainer>)
}