'use client';

import { Card, Container, Section } from '@repo/ui';

const features = [
  {
    title: 'Fast Loading',
    description: 'Optimized for speed with lazy loading and image optimization.',
  },
  {
    title: 'SEO Ready',
    description: 'Built-in SEO features including meta tags and structured data.',
  },
  {
    title: 'Responsive Design',
    description: 'Perfect on all devices from mobile to desktop.',
  },
  {
    title: 'Lead Capture',
    description: 'Integrated forms to collect and store leads.',
  },
];

export function Features() {
  return (
    <Section>
      <Container>
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">Powerful Features</h2>
          <p className="mt-4 text-neutral-600">Everything you need for high-converting pages</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
