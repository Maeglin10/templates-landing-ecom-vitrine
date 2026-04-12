"use client";
import { Card, Container, Section, Input, AnimatedHero, ScrollReveal, CinematicSlider } from "@repo/ui";
import { Button } from "@repo/ui";
import { Zap, Shield, Rocket } from "lucide-react";
import { useState } from "react";

const DEMO_SLIDES = [
  {
    headline: "Build Cinematic Digital Experiences",
    subline: "A bleeding-edge Turborepo boilerplate designed for teams that ship.",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80",
    cta: "Get Started",
    ctaHref: "#features",
  },
  {
    headline: "Scale Without Limits",
    subline: "Intelligent caching, parallel execution, and edge rendering out of the box.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80",
    cta: "View Docs",
    ctaHref: "#",
  },
  {
    headline: "Ship Value, Not Boilerplate",
    subline: "Stop configuring. Start building what matters with 2026-level aesthetics.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
    cta: "Join the Beta",
    ctaHref: "#newsletter",
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(result.error ?? "Subscription failed");
        return;
      }

      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24 overflow-hidden relative">

      {/* Animated Hero — full-viewport with split text + gradient mesh */}
      <AnimatedHero
        headline="Build your Dream Product in seconds."
        subtitle="A bleeding-edge Turborepo boilerplate designed for serious teams. Stop focusing on setup, start shipping value with 2026-level aesthetics right out of the box."
        ctaPrimary="Get Started Now"
        ctaSecondary="View Documentation"
        ctaPrimaryHref="#features"
        ctaSecondaryHref="#"
      />

      {/* Cinematic Slider — full-screen showcase */}
      <section className="w-full" aria-label="Feature showcase">
        <CinematicSlider slides={DEMO_SLIDES} interval={5000} />
      </section>

      {/* Features Section */}
      <Section animated id="features">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Unfair Advantages</h2>
              <p className="text-lg text-foreground/60">Everything you need to launch a production-ready application.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Turborepo Architecture", desc: "Scale infinitely with intelligent caching and parallel execution.", icon: <Zap className="h-6 w-6 text-yellow-500" /> },
              { title: "Enterprise Security", desc: "Built-in guards, secure headers, and strict TypeScript configurations.", icon: <Shield className="h-6 w-6 text-green-500" /> },
              { title: "Peak Performance", desc: "Next.js App Router pushing the absolute limits of edge rendering.", icon: <Rocket className="h-6 w-6 text-blue-500" /> },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <Card className="flex flex-col items-start gap-4 hover:-translate-y-2 transition-transform duration-300 h-full">
                  <div className="p-3 bg-foreground/5 rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-foreground/60">{feature.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA / Lead Form Section */}
      <Section animated className="mt-24 py-32 bg-primary text-primary-foreground relative overflow-hidden" id="newsletter">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Join the Revolution.</h2>
            <p className="text-lg text-primary-foreground/80 mb-12">
              Sign up for early access. We will only accept 100 teams for the private beta.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <form
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <Input
                type="email"
                placeholder="you@company.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-14 rounded-2xl focus:bg-primary-foreground/20"
              />
              <Button size="lg" className="h-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shrink-0" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Request Access"}
              </Button>
            </form>
            {message && (
              <p className={`mt-4 text-sm ${status === "success" ? "text-green-200" : "text-red-200"}`}>
                {message}
              </p>
            )}
          </ScrollReveal>
        </Container>
      </Section>
    </main>
  );
}
