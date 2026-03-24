'use client';

import { useState, useEffect } from 'react';
import { Container, Section, Button, Input } from '@repo/ui';
import { useFormBuilder } from '@repo/forms';
import { validateEmail } from '@repo/lib';
import { trackCustomEvent } from '@repo/analytics';

const newsletterFields = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email' as const,
    placeholder: 'your@email.com',
    required: true,
  },
];

export function Newsletter() {
  const [showMessage, setShowMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { formData, errors, loading, success, setSuccess, handleChange, handleSubmit } = useFormBuilder({
    fields: newsletterFields,
    onSubmit: async (data) => {
      if (!validateEmail(data.email)) {
        throw new Error('Invalid email');
      }

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Subscription failed');

      trackCustomEvent('newsletter_signup', { email: data.email });
    },
  });

  useEffect(() => {
    if (success) {
      setShowMessage({ type: 'success', text: 'Thanks for subscribing!' });
      setSuccess(false);
      setTimeout(() => setShowMessage(null), 3000);
    }
  }, [success, setSuccess]);

  return (
    <Section className="bg-neutral-900 text-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="mt-4 text-neutral-300">
            Get the latest landing page tips and templates delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              className="bg-white text-neutral-900"
            />
            <Button
              variant="secondary"
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          {showMessage && (
            <p className={`mt-4 ${showMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {showMessage.text}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
