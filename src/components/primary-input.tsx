import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { SearchIcon } from "../app/icon/search-icon";

export const PrimaryInput = styled.input`
width: 100%;
border-radius: 8px;
padding: 10px 16px;
background-color: var(--bg-secundary);
font-family: inherit;
font-size: 12px;
font-weight: 400;
line-height: 20px; /* 157.143% */
color: var(--text-dark);
border: none;
    @media (min-width: 768px) {
        font-size: 14px;
        line-height: 22px; /* 157.143% */

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
