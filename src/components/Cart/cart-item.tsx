import { DeleteIcon } from "@/app/icon/delete-icon"
import { ProductInCart } from "@/types/products"
import { formatValue } from "@/utils/format-price"
import { ChangeEvent } from "react"
import styled from "styled-components"

interface CartItemProps {
    product: ProductInCart
    handleUpdateQuantity: (id: string, quantity: number) => void
    handleDelete: (id: string) => void
}

const Item = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 210px;

    border-radius: var(--border-radius);
    border: 1px solid var(--shapes);
    background-color: var(--bg-card);
    transition: box-shadow var(--transition);
    
    &:hover {
        box-shadow: 0 4px 16px rgba(48, 46, 43, 0.08);
    }

    position: relative;

    button {
        position: absolute;
        top: 16px;
        right: 24px;

        border: none;
        background: transparent;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity var(--transition);

        &:hover { opacity: 1; }
    }

    img {
        max-height: 100%;
        width: 256px;
        border-radius: calc(var(--border-radius) - 1px) 0 0 calc(var(--border-radius) - 1px);
        object-fit: cover;
    }

    > div {
        display: flex;
        width: 100%;
        height:100%;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        padding: 16px 24px;
        line-height: 150%;
        color: var(--text-dark-2);

        h4 {
            font-weight: 300;
            font-size: 20px;
        }

        p {
            font-weight: 400;
            font-size: 12px;
            color: var(--text-dark);
            max-height: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            span {
                font-weight: 600;
                font-size: 16px;
                color: var(--accent-brown);
            }
        }
    }
`
    const SelectQuantity = styled.select`
    padding: 8px 12px;
    border: 1.5px solid var(--shapes);
    border-radius: 6px;
    background-color: var(--bg-secundary);
    color: var(--text-dark-2);
    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    transition: border-color var(--transition);

    &:focus {
        border-color: var(--accent-brown);
    }
`


export function CartItem({ product, handleUpdateQuantity, handleDelete} : CartItemProps){

    
    const handleChange =  (e: ChangeEvent<HTMLSelectElement>) => {
        handleUpdateQuantity(product.id, Number(e.target.value))
    }
    
    return (
        <Item>
            <button onClick={() => handleDelete(product.id)} aria-label="Deletar">
                <DeleteIcon/>
            </button>
            <img src={product.image_url}></img>
            <div>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div>
                <SelectQuantity value={product.quantity} onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </SelectQuantity>
                    <span>{formatValue(product.price_in_cents * product.quantity)}</span>   
                </div>
            </div>
        </Item>
    )
}