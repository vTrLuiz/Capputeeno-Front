import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { SearchIcon } from "../app/icon/search-icon";

export const PrimaryInput = styled.input`
width: 100%;
border-radius: 6px;
padding: 10px 40px 10px 16px;
background-color: var(--bg-secundary);
font-family: inherit;
font-size: 12px;
font-weight: 400;
line-height: 20px;
color: var(--text-dark-2);
border: 1px solid transparent;
outline: none;
transition: border-color var(--transition);

&:focus {
    border-color: var(--accent-brown);
}

&::placeholder {
    color: var(--text-dark);
}

    @media (min-width: 768px) {
        font-size: 14px;
        line-height: 22px;
    }
`

const InputContainer = styled.div`
    position: relative;
    width: 250px;
    svg{
        position: absolute;
        width: 24px;
        height: 24px;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }

    @media (min-width: 768px) {
        width: 352px;
    }

`
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string,
    handleChange: (value: string ) => void
}

export function PrimaryInputWSearchIcon({handleChange, ...props}: InputProps){
    return(
        
        <InputContainer>
            <PrimaryInput 
                onChange={(event) => handleChange(event.target.value)} 
                {...props}
            />
            <SearchIcon />
        </InputContainer>
        
    )
}
