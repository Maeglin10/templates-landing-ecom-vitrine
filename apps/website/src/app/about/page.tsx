import { Container, Section } from '@repo/ui';

export const metadata = {
  title: 'About Us',
};

export default function About() {
  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="mt-6 text-lg text-neutral-600">
              We are a team of experienced professionals dedicated to helping businesses succeed
              in the digital world. With years of expertise across multiple disciplines, we bring a
              comprehensive approach to solving complex challenges.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p className="mt-4 text-neutral-600">
                  To empower businesses through innovative digital solutions that drive growth,
                  engagement, and success.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Our Values</h2>
                <ul className="mt-4 space-y-2 text-neutral-600">
                  <li>• Excellence in every project</li>
                  <li>• Client satisfaction is paramount</li>
                  <li>• Continuous innovation and learning</li>
                  <li>• Transparent communication</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
