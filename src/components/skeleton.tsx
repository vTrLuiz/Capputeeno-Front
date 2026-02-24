import styled, { keyframes } from "styled-components"

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`

export const Skeleton = styled.div<{ width?: string; height?: string; radius?: string }>`
  width:  ${p => p.width  ?? '100%'};
  height: ${p => p.height ?? '16px'};
  border-radius: ${p => p.radius ?? '4px'};
  background: linear-gradient(
    90deg,
    #e8e3dc 25%,
    #f0ece5 50%,
    #e8e3dc 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  flex-shrink: 0;
`
