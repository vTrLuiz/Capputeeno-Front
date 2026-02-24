import styled from "styled-components"
import { Skeleton } from "./skeleton"

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 256px;
    border: 1px solid var(--shapes);
    border-radius: 4px;
    overflow: hidden;
    background: var(--bg-card);
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 14px 14px;
`

export function ProductCardSkeleton() {
    return (
        <Card>
            <Skeleton height="300px" radius="0" />
            <Info>
                <Skeleton height="18px" width="75%" />
                <Skeleton height="1px" />
                <Skeleton height="16px" width="45%" />
            </Info>
        </Card>
    )
}
