import { Container, Section, Card } from "@repo/ui";
import { Code2, Search, Palette, Smartphone, BarChart3, Globe, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Services — NexStudio",
  description: "Web design, SEO, branding, development and more — all under one roof.",
};

const services = [
  {
    icon: <Palette className="h-8 w-8 text-violet-500" />,
    title: "Web Design",
    tagline: "Beautiful by default. Functional by design.",
    description:
      "We create visually stunning, fully responsive websites that tell your brand story and convert visitors into customers. Every pixel is considered; every interaction is intentional.",
    features: [
      "UI/UX strategy & wireframing",
      "Responsive design for all devices",
      "Design system creation",
      "Prototype & user testing",
    ],
    tiers: [
      { name: "Starter", price: "€2 500", desc: "1–5 pages, brand alignment, CMS-ready" },
      { name: "Pro", price: "€6 000", desc: "Up to 15 pages, custom animations, e-mail templates" },
      { name: "Enterprise", price: "Custom", desc: "Full design system, ongoing retainer, dedicated designer" },
    ],
    color: "violet",
  },
  {
    icon: <Search className="h-8 w-8 text-blue-500" />,
    title: "SEO",
    tagline: "Rank higher. Stay there.",
    description:
      "Our technical and content SEO strategies are built on data, not guesswork. We audit, optimise, and track every signal that matters to Google — so your site earns organic growth month over month.",
    features: [
      "Technical SEO audit & fixes",
      "Keyword research & content planning",
      "On-page optimisation",
      "Link-building outreach",
    ],
    tiers: [
      { name: "Launch", price: "€800/mo", desc: "Monthly audit, on-page fixes, reporting" },
      { name: "Growth", price: "€1 800/mo", desc: "Content strategy, link building, competitor analysis" },
      { name: "Dominate", price: "€3 500/mo", desc: "Full-stack SEO, dedicated strategist, weekly calls" },
    ],
    color: "blue",
  },
  {
    icon: <Globe className="h-8 w-8 text-emerald-500" />,
    title: "Branding",
    tagline: "An identity worth remembering.",
    description:
      "Great brands aren&apos;t built by accident. We develop comprehensive brand systems — from strategy and naming through logo design, typography, colour palette, and tone of voice.",
    features: [
      "Brand strategy workshop",
      "Logo & visual identity",
      "Brand guidelines document",
      "Social media kit",
    ],
    tiers: [
      { name: "Identity", price: "€3 000", desc: "Logo, colour palette, typography, one-page guidelines" },
      { name: "Brand System", price: "€7 500", desc: "Full guidelines, stationery, social kit, 3 revisions" },
      { name: "Brand Launch", price: "€15 000", desc: "Strategy + full identity + website + launch campaign" },
    ],
    color: "emerald",
  },
  {
    icon: <Code2 className="h-8 w-8 text-orange-500" />,
    title: "Development",
    tagline: "Code that scales with your ambitions.",
    description:
      "We build high-performance web applications using Next.js, React, and Node.js. Whether it&apos;s a marketing site or a complex SaaS platform, we architect for speed, security, and maintainability.",
    features: [
      "Next.js / React applications",
      "REST & GraphQL APIs",
      "Headless CMS integration",
      "CI/CD & DevOps setup",
    ],
    tiers: [
      { name: "Website", price: "€4 000", desc: "Marketing site, CMS, deployment" },
      { name: "Web App", price: "€12 000", desc: "Custom application, auth, database, integrations" },
      { name: "Platform", price: "Custom", desc: "SaaS / marketplace, ongoing engineering team" },
    ],
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  violet: "bg-violet-50 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900",
  blue: "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900",
  emerald: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900",
  orange: "bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900",
};

const badgeMap: Record<string, string> = {
  violet: "bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300",
  blue: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  emerald: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
  orange: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
};

export default function Services() {
  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <Section className="pt-20 pb-16 bg-foreground/3">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-4 py-2 rounded-full mb-6">
              What we do
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Four disciplines,<br />one studio.
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              NexStudio brings together design, SEO, branding, and engineering so you never have to
              coordinate between multiple agencies again.
            </p>
          </div>
        </Container>
      </Section>

      {/* Service Cards */}
      <Section className="py-20">
        <Container>
          <div className="flex flex-col gap-20">
            {services.map((service, i) => (
              <div key={i} className={`rounded-3xl border p-8 md:p-12 ${colorMap[service.color]}`}>
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-white/80 dark:bg-white/10 shadow-sm">
                        {service.icon}
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${badgeMap[service.color]}`}>
                        Service
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-2">{service.title}</h2>
                    <p className="text-foreground/50 font-medium mb-5 italic">{service.tagline}</p>
                    <p className="text-foreground/70 leading-relaxed mb-8">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-medium">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right — Pricing tiers */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-2">Pricing tiers</h3>
                    {service.tiers.map((tier, j) => (
                      <Card key={j} className={`flex items-start justify-between gap-4 ${j === 1 ? "ring-2 ring-violet-400 dark:ring-violet-600" : ""}`}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{tier.name}</span>
                            {j === 1 && (
                              <span className="text-[10px] bg-violet-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-foreground/60">{tier.desc}</p>
                        </div>
                        <span className="font-black text-lg text-foreground whitespace-nowrap">{tier.price}</span>
                      </Card>
                    ))}
                    <Link href="/contact" className="mt-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-3 transition-all">
                        Get a quote <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <Container>
          <div className="rounded-3xl bg-foreground/5 border border-foreground/10 p-12 text-center">
            <h2 className="text-3xl font-black mb-4">Not sure which service you need?</h2>
            <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
              Book a free 30-minute consultation and we&apos;ll help you map out the right path for your business.
            </p>
            <Link href="/contact">
              <div className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-2xl transition-colors">
                Book a free call <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
