import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Our Website';
  const subtitle = searchParams.get('subtitle') ?? '';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Site';

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
          background: 'linear-gradient(135deg, #0c0c0c 0%, #1e1b4b 50%, #312e81 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)',
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
              background: 'linear-gradient(135deg, #38bdf8, #22d3ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
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
            fontSize: '64px',
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
              fontSize: '24px',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '20px',
              textAlign: 'center',
              maxWidth: '700px',
              display: 'flex',
            }}
          >
            {subtitle}
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
              background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
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
