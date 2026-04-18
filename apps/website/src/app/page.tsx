"use client";
import Link from "next/link";
import { Button, Card, Container, Section } from "@repo/ui";
import { ArrowRight, Code2, Search, Palette, Smartphone, BarChart3, Globe, CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Palette className="h-7 w-7 text-violet-500" />,
    title: "Web Design",
    description: "Pixel-perfect interfaces crafted to reflect your brand and delight your users.",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: <Search className="h-7 w-7 text-blue-500" />,
    title: "SEO",
    description: "Data-driven strategies that push you to the top of search results and keep you there.",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: <Globe className="h-7 w-7 text-emerald-500" />,
    title: "Branding",
    description: "Distinctive identities that make your business unforgettable across every touchpoint.",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: <Code2 className="h-7 w-7 text-orange-500" />,
    title: "Development",
    description: "Robust, scalable web applications built with modern frameworks and best practices.",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: <Smartphone className="h-7 w-7 text-pink-500" />,
    title: "Mobile",
    description: "Native-quality mobile experiences that work flawlessly on any device.",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: <BarChart3 className="h-7 w-7 text-amber-500" />,
    title: "Analytics",
    description: "Clear insights into your audience behaviour to drive better product decisions.",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

const stats = [
  { value: "150+", label: "Projects delivered" },
  { value: "8 yrs", label: "Industry experience" },
  { value: "98%", label: "Client satisfaction" },
  { value: "40+", label: "Team members" },
];

const clients = [
  "Atelier Co.", "Vanta Labs", "Meridian", "Folio Group", "Arc Studio", "Bloom Digital",
];

const testimonials = [
  {
    quote: "NexStudio completely transformed our online presence. Traffic is up 3× in six months.",
    author: "Sophie Martin",
    role: "CMO, Vanta Labs",
    rating: 5,
  },
  {
    quote: "The team delivered beyond scope and on time. Our new site converts at twice the old rate.",
    author: "Lucas Bernard",
    role: "Founder, Meridian",
    rating: 5,
  },
  {
    quote: "Professional, creative, and genuinely invested in our success. Highly recommended.",
    author: "Camille Durand",
    role: "CEO, Bloom Digital",
    rating: 5,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden bg-background">
      {/* Hero */}
      <Section className="relative pt-32 lg:pt-48 w-full" spacing="xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 -z-10" />
        <Container className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Digital Agency — Paris
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]"
            >
              We craft digital
              <br />
              <span className="text-violet-600 dark:text-violet-400">experiences</span>
              <br />
              that convert.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-foreground/60 mb-10 max-w-xl leading-relaxed"
            >
              NexStudio is a full-service digital agency helping ambitious brands grow through
              design, development, and strategy that actually moves the needle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/contact">
                <Button size="lg" className="h-14 px-8 bg-violet-600 hover:bg-violet-700 text-white">
                  Start your project
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" size="lg" className="h-14" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Our services
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="flex-1 w-full max-w-lg"
          >
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-950/60 dark:to-blue-950/60 border border-foreground/10 p-6 flex flex-col gap-4">
              <div className="flex gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 grid grid-cols-5 gap-3">
                <div className="col-span-2 bg-white/70 dark:bg-white/10 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-200 dark:bg-violet-800" />
                  <div className="h-2 w-3/4 bg-foreground/10 rounded-full" />
                  <div className="h-2 w-1/2 bg-foreground/10 rounded-full" />
                  <div className="mt-auto h-7 w-full bg-violet-500/30 rounded-lg" />
                </div>
                <div className="col-span-3 flex flex-col gap-3">
                  <div className="flex-1 bg-white/70 dark:bg-white/10 rounded-2xl p-4">
                    <div className="h-full bg-gradient-to-br from-violet-300/40 to-blue-300/40 dark:from-violet-700/40 dark:to-blue-700/40 rounded-xl" />
                  </div>
                  <div className="h-14 bg-white/70 dark:bg-white/10 rounded-2xl px-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-violet-400" />
                    <div className="flex-1 h-2 bg-foreground/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Client Logos */}
      <Section className="w-full border-y border-foreground/5 py-10">
        <Container>
          <p className="text-center text-xs uppercase tracking-widest text-foreground/40 mb-8 font-semibold">
            Trusted by forward-thinking brands
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {clients.map((client) => (
              <span key={client} className="text-foreground/30 font-bold text-sm tracking-wide hover:text-foreground/60 transition-colors cursor-default">
                {client}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section animated className="w-full py-24">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black tracking-tight mb-4">Everything you need to win online</h2>
              <p className="text-foreground/60 text-lg">
                From concept to launch and beyond — we cover every discipline of the modern digital stack.
              </p>
            </div>
            <Link href="/services">
              <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View all services
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className={`mb-5 p-3 rounded-2xl w-fit ${service.bg}`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <Section className="w-full bg-foreground/5 rounded-[2.5rem] mx-4 sm:mx-8" style={{ width: "calc(100% - 2rem)" }}>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-violet-600 dark:text-violet-400 mb-2">{stat.value}</div>
                <div className="text-sm text-foreground/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section animated className="w-full py-24">
        <Container>
          <h2 className="text-4xl font-black tracking-tight mb-4 text-center">What clients say</h2>
          <p className="text-foreground/60 text-center mb-16 max-w-xl mx-auto">
            Don&apos;t take our word for it — here&apos;s what the teams we&apos;ve worked with have to say.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col gap-4">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground/70 italic leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="font-bold text-sm">{t.author}</p>
                    <p className="text-xs text-foreground/50">{t.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="w-full pb-24">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to build something great?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Let&apos;s talk about your project. We&apos;ll respond within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-white/90 h-14 px-8 font-bold">
                  Get in touch
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 h-14" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Meet the team
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-white/70 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>No commitment required — free initial consultation</span>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
