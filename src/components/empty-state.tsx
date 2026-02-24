import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 80px 24px;
    width: 100%;
    text-align: center;
`

const Illustration = styled.div`
    font-size: 48px;
    line-height: 1;
    opacity: 0.4;
`

const Title = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: var(--text-dark-2);
`

const Subtitle = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: var(--text-dark);
    max-width: 320px;
    line-height: 1.6;
`

interface EmptyStateProps {
    icon?: string
    title: string
    subtitle?: string
    action?: React.ReactNode
}

export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
    return (
        <Wrapper>
            {icon && <Illustration>{icon}</Illustration>}
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            {action}
        </Wrapper>
    )
}
