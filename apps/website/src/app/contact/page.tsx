'use client';

import { Container, Section, Input, Button } from '@repo/ui';
import { useFormBuilder } from '@repo/forms';
import { contactFormSchema } from '@repo/lib';
import { trackCustomEvent } from '@repo/analytics';

const contactFields = [
  { name: 'name', label: 'Name', type: 'text' as const, required: true },
  { name: 'email', label: 'Email', type: 'email' as const, required: true },
  { name: 'phone', label: 'Phone', type: 'text' as const, required: false },
  { name: 'message', label: 'Message', type: 'textarea' as const, required: true },
];

export const metadata = {
  title: 'Contact Us',
};

export default function Contact() {
  const { formData, errors, loading, success, setSuccess, handleChange, handleSubmit } = useFormBuilder({
    fields: contactFields,
    schema: contactFormSchema,
    onSubmit: async (data) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Message failed to send');

      trackCustomEvent('contact_form_submit', { email: data.email });
    },
  });

  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold">Contact Us</h1>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <Input
                label="Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                label="Phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange as any}
                  rows={6}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2"
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>

              {success && <p className="text-green-600">Message sent successfully!</p>}
            </form>
          </div>
        </Container>
      </Section>
    </main>
  );
}
