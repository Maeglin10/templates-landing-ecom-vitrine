'use client';

import { Container, Section } from '@repo/ui';

export function Hero() {
  return (
    <Section className="bg-neutral-50">
      <Container>
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            High-Converting Landing Page
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-600">
            Build professional landing pages in minutes. Capture leads, drive conversions, and grow your business.
          </p>
          <div className="flex justify-center gap-4">
            <button className="rounded-lg bg-neutral-900 px-8 py-3 font-medium text-white hover:bg-neutral-800">
              Get Started
            </button>
            <button className="rounded-lg border border-neutral-300 px-8 py-3 font-medium hover:bg-neutral-50">
              Learn More
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
