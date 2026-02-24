import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#302E2B',
          borderRadius: '6px',
        }}
      >
        <span
          style={{
            color: '#F7F5F0',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '-1px',
          }}
        >
          C
        </span>
      </div>
    ),
    { ...size }
  )
}
