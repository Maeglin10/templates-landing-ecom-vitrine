import { Container, Section } from '@repo/ui';

export function Footer() {
  return (
    <Section className="border-t border-neutral-200 bg-neutral-50">
      <Container>
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">&copy; 2024 Website. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900">
              Privacy
            </a>
            <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
