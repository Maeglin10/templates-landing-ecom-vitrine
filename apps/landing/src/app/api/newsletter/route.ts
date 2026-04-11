export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { rateLimit } from '@repo/lib';

const resend = new Resend(process.env.RESEND_API_KEY);

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rl = rateLimit({ ip, limit: 5, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Invalid email' },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Send welcome email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Team <contact@yourdomain.com>', // Requires verified domain in Resend
      to: email,
      subject: '🎉 Welcome — You\'re on the list!',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <h1 style="font-size:32px;font-weight:900;margin-bottom:16px">Welcome aboard 🚀</h1>
          <p style="font-size:16px;color:#555;line-height:1.6">
            You've successfully subscribed to our newsletter. We'll reach out with exclusive updates, 
            early access announcements, and more.
          </p>
          <p style="font-size:14px;color:#999;margin-top:32px">
            You can unsubscribe at any time by replying "unsubscribe" to this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
