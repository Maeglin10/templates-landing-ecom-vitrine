import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_email ?? session.metadata?.customerEmail;
      const customerName = session.metadata?.customerName ?? 'Customer';
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;

      console.log(`Order confirmed — ${customerEmail} — €${amountTotal}`);

      if (customerEmail) {
        try {
          await resend.emails.send({
            from: 'orders@yourdomain.com',
            to: customerEmail,
            subject: 'Order Confirmed',
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                <h1>Thank you, ${customerName}!</h1>
                <p>Your order of <strong>€${amountTotal.toFixed(2)}</strong> has been confirmed.</p>
                <p>You will receive shipping confirmation once your order is dispatched.</p>
                <hr />
                <p style="color:#888;font-size:12px">Order ID: ${session.id}</p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error('Failed to send order confirmation email:', emailErr);
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error(`Payment failed: ${paymentIntent.id}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
