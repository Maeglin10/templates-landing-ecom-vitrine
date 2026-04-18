import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Shop';
  const subtitle = searchParams.get('subtitle') ?? '';
  const price = searchParams.get('price') ?? '';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Store';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1917 50%, #292524 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-80px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#0a0a0a',
              fontWeight: 900,
            }}
          >
            {siteName[0]}
          </div>
          <span
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '-0.02em',
            }}
          >
            {siteName}
          </span>
        </div>

        <div
          style={{
            fontSize: '60px',
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            maxWidth: '900px',
            padding: '0 40px',
            display: 'flex',
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '16px',
              textAlign: 'center',
              maxWidth: '700px',
              display: 'flex',
            }}
          >
            {subtitle}
          </div>
        )}

        {price && (
          <div
            style={{
              marginTop: '24px',
              padding: '8px 24px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              fontSize: '28px',
              fontWeight: 800,
              color: '#0a0a0a',
              display: 'flex',
            }}
          >
            {price}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '3px',
              background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
              borderRadius: '2px',
              display: 'flex',
            }}
          />
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
            {new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com').hostname}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
