import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Ecommerce Template';
  const description = searchParams.get('description') || 'Discover our premium products.';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#fff',
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            color: '#a3a3a3',
            fontSize: 40,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
