import { Container, Section } from '@repo/ui';

export default function Account() {
  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">My Account</h1>
            <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-8">
              <p className="text-neutral-600">Sign in to view your orders and account details.</p>
              <button className="mt-6 rounded-lg bg-neutral-900 px-6 py-2 text-white hover:bg-neutral-800">
                Sign In
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
