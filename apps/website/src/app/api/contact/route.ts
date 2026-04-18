import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@repo/lib';

export const dynamic = 'force-dynamic';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes('REPLACE')) return null;
  const { Resend: ResendClass } = require('resend');
  return new ResendClass(key);
}

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const rl = rateLimit({ ip, limit: 5, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parsed.data;
    const siteEmail = process.env.CONTACT_EMAIL ?? 'contact@yourdomain.com';

    const resend = getResend();
    if (!resend) {
      console.log(`[DEV] Contact from ${name} <${email}>: ${message}`);
      return NextResponse.json({ success: true });
    }

    // Notify site owner
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Team <contact@yourdomain.com>', // Requires verified domain in Resend
      to: siteEmail,
      subject: `📩 New contact message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 20px">
          <h2>New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;width:120px"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555"><strong>Email:</strong></td><td>${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#555"><strong>Phone:</strong></td><td>${phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#555;vertical-align:top"><strong>Message:</strong></td><td>${message}</td></tr>
          </table>
        </div>
      `,
    });

    // Send acknowledgement to visitor
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Team <contact@yourdomain.com>', // Requires verified domain in Resend
      to: email,
      subject: 'We received your message ✅',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <h1 style="font-size:28px;font-weight:900">Hi ${name} 👋</h1>
          <p style="font-size:16px;color:#555;line-height:1.6">
            Thank you for reaching out! We've received your message and will get back to you within 24–48 hours.
          </p>
          <blockquote style="border-left:4px solid #eee;padding:12px 20px;color:#777;margin:24px 0">
            "${message}"
          </blockquote>
          <p style="font-size:14px;color:#999">Best regards,<br/>The Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
