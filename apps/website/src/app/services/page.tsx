import { Container, Section, Card } from '@repo/ui';

const services = [
  {
    title: 'Web Design',
    description: 'Beautiful and responsive websites tailored to your brand.',
  },
  {
    title: 'SEO Optimization',
    description: 'Improve your search engine rankings and visibility.',
  },
  {
    title: 'Content Strategy',
    description: 'Develop compelling content that engages your audience.',
  },
];

export const metadata = {
  title: 'Our Services',
};

export default function Services() {
  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold">Our Services</h1>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title}>
                <h3 className="font-semibold">{service.title}</h3>
                <p className="mt-2 text-neutral-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
