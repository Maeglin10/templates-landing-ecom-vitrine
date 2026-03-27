"use client";
import { Button, Card, Container, Section, Input } from "@repo/ui";
import { ArrowRight, Sparkles, Zap, Shield, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent -z-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[150px] rounded-full -z-10" />

      {/* Hero Section */}
      <Section className="relative pt-32 lg:pt-48" spacing="xl">
        <Container className="text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium mb-8 border border-primary/10 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>The Future of Digital Experiences</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 max-w-5xl leading-[1.1] text-balance"
          >
            Build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Dream Product</span> in seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl text-balance"
          >
            A bleeding-edge Turborepo boilerplate designed for serious teams. 
            Stop focusing on setup, start shipping value with 2026-level aesthetics right out of the box.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto text-lg h-14" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14">
              View Documentation
            </Button>
          </motion.div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section animated id="features">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Unfair Advantages</h2>
            <p className="text-lg text-foreground/60">Everything you need to launch a production-ready application.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Turborepo Architecture", desc: "Scale infinitely with intelligent caching and parallel execution.", icon: <Zap className="h-6 w-6 text-yellow-500" /> },
              { title: "Enterprise Security", desc: "Built-in guards, secure headers, and strict TypeScript configurations.", icon: <Shield className="h-6 w-6 text-green-500" /> },
              { title: "Peak Performance", desc: "Next.js App Router pushing the absolute limits of edge rendering.", icon: <Rocket className="h-6 w-6 text-blue-500" /> },
            ].map((feature, i) => (
              <Card key={i} className="flex flex-col items-start gap-4 hover:-translate-y-2 transition-transform duration-300">
                <div className="p-3 bg-foreground/5 rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-foreground/60">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA / Lead Form Section */}
      <Section animated className="mt-24 py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Join the Revolution.</h2>
          <p className="text-lg text-primary-foreground/80 mb-12">
            Sign up for early access. We will only accept 100 teams for the private beta.
          </p>
          
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
        </Container>
      </Section>
    </main>
  );
}
