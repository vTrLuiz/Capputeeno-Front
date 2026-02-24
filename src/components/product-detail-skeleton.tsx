import styled from "styled-components"
import { Skeleton } from "./skeleton"

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 32px;
    margin-top: 24px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const InfoCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 16px;
    max-width: 480px;
`

const DescBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

export function ProductDetailSkeleton() {
    return (
        <Wrapper>
            {/* Image placeholder */}
            <Skeleton width="50%" height="520px" radius="4px" style={{ minWidth: 280 } as React.CSSProperties} />

            <InfoCol>
                {/* Category */}
                <Skeleton width="100px" height="14px" />
                {/* Title */}
                <Skeleton width="80%" height="36px" />
                {/* Price */}
                <Skeleton width="120px" height="22px" />
                {/* Shipping note */}
                <Skeleton width="100%" height="12px" />

                <DescBlock>
                    <Skeleton width="120px" height="14px" />
                    <Skeleton height="12px" />
                    <Skeleton height="12px" width="92%" />
                    <Skeleton height="12px" width="80%" />
                    <Skeleton height="12px" width="88%" />
                </DescBlock>

                {/* Button */}
                <Skeleton height="44px" radius="var(--border-radius)" style={{ marginTop: 'auto' } as React.CSSProperties} />
            </InfoCol>
        </Wrapper>
    )
}
