import { Container, Section, Card } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Zap, Shield, Users } from "lucide-react";

export const metadata = {
  title: "About NexStudio",
  description: "Meet the team behind NexStudio — a Paris-based digital agency with 8 years of experience.",
};

const team = [
  {
    name: "Alexis Fontaine",
    role: "Founder & Creative Director",
    bio: "Alexis founded NexStudio after 10 years leading design teams at top Paris agencies. He drives creative strategy and ensures every project reflects our obsession with craft.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Léa Moreau",
    role: "Head of Development",
    bio: "Léa is a full-stack engineer with deep expertise in React, Next.js, and cloud infrastructure. She leads our engineering team and sets the bar for technical excellence.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Théo Lambert",
    role: "SEO & Growth Strategist",
    bio: "Théo has helped over 60 brands multiply their organic traffic. He blends data analysis with content strategy to deliver measurable, lasting results.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  },
];

const values = [
  {
    icon: <Zap className="h-6 w-6 text-amber-500" />,
    title: "Speed with intention",
    description: "We move fast — but never at the cost of quality. Rapid iteration and careful thinking are not opposites.",
  },
  {
    icon: <Heart className="h-6 w-6 text-rose-500" />,
    title: "Genuine care",
    description: "Your success is our success. We treat every client's business as if it were our own — because in many ways, it is.",
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    title: "Radical transparency",
    description: "No hidden fees, no vague timelines. We communicate clearly, deliver on promises, and tell you the truth even when it's uncomfortable.",
  },
  {
    icon: <Users className="h-6 w-6 text-violet-500" />,
    title: "Collaboration",
    description: "The best outcomes come from close partnership. We bring our expertise; you bring your vision. Together we make something remarkable.",
  },
];

const milestones = [
  { year: "2016", event: "NexStudio founded in a shared studio in the 11th arrondissement of Paris." },
  { year: "2018", event: "Grew to 12 people. Launched our SEO practice after client demand." },
  { year: "2020", event: "Opened a second studio in Lyon. Crossed 80 projects delivered." },
  { year: "2022", event: "Named one of France's top digital agencies by Le Monde Informatique." },
  { year: "2024", event: "40-strong team, 150+ projects, 98% client satisfaction score." },
];

export default function About() {
  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <Section className="pt-20 pb-16">
        <Container className="max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-4 py-2 rounded-full mb-8">
            Our story
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
            We believe great digital
            <br />
            work changes businesses.
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed max-w-2xl">
            NexStudio was born from a simple conviction: most companies are leaving enormous value on
            the table because their digital presence doesn&apos;t match the quality of what they actually do.
            We fix that.
          </p>
        </Container>
      </Section>

      {/* Story / Timeline */}
      <Section className="py-16 bg-foreground/3">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-black mb-6">How we got here</h2>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Alexis Fontaine started NexStudio in 2016 after years of frustration watching brilliant
                French companies struggle online because they were working with agencies that treated
                them like ticket numbers.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6">
                The idea was radical in its simplicity: build a studio that genuinely cares about client
                outcomes, hires only exceptional people, and holds itself accountable to real business
                results — not just deliverables.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Eight years later, we&apos;re a team of 40 designers, engineers, and strategists — and
                that core commitment to doing work that matters hasn&apos;t changed one bit.
              </p>
            </div>
            <div className="relative pl-8 border-l-2 border-foreground/10">
              {milestones.map((m, i) => (
                <div key={i} className="mb-8 relative">
                  <div className="absolute -left-10 w-4 h-4 rounded-full bg-violet-500 border-4 border-background" />
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">{m.year}</span>
                  <p className="text-foreground/70 mt-1 text-sm leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="py-20">
        <Container>
          <h2 className="text-4xl font-black mb-4">The people behind the work</h2>
          <p className="text-foreground/60 mb-14 max-w-xl text-lg">
            Our core leadership team — and the extended crew of 40 specialists behind them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <Card key={i} className="overflow-hidden p-0">
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-foreground/60 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="py-20 bg-foreground/3">
        <Container>
          <h2 className="text-4xl font-black mb-4">What we stand for</h2>
          <p className="text-foreground/60 mb-14 max-w-xl text-lg">
            Values aren&apos;t words on a wall here — they&apos;re decisions we make every single day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="flex gap-5">
                <div className="p-3 rounded-2xl bg-foreground/5 h-fit flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-20">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 p-10 text-white">
            <div>
              <h2 className="text-3xl font-black mb-2">Want to work with us?</h2>
              <p className="text-white/80">We&apos;re always looking for ambitious clients and talented people.</p>
            </div>
            <Link href="/contact">
              <div className="flex items-center gap-2 bg-white text-violet-700 font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-colors whitespace-nowrap">
                Get in touch <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
