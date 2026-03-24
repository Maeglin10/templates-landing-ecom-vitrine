import { Container, Section } from '@repo/ui';

export async function generateMetadata() {
  return {
    title: 'Home',
  };
}

export default function Home() {
  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold">Welcome</h1>
            <p className="text-xl text-neutral-600">
              Professional services tailored to your needs
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
