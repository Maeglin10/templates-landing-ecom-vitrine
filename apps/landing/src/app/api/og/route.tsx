import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Welcome';
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
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
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
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
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
              background: 'linear-gradient(90deg, #6366f1, #a855f7)',
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
