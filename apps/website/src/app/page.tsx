"use client";
import { Button, Card, Container, Section } from "@repo/ui";
import { ArrowRight, BookOpen, Layers, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function WebsitePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24 overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-t from-background via-foreground/[0.03] to-background -z-10" />

      {/* Hero Section */}
      <Section className="relative pt-32 lg:pt-48" spacing="xl">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
          <div className="flex-1 text-left">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              Enterprise Grade <br />
              <span className="text-foreground/40 text-4xl md:text-6xl">Corporate Solutions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-foreground/60 mb-10 max-w-xl"
            >
              Streamline your business presence with high-converting, scalable websites designed for fast-moving corporate teams.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" className="h-14">
                Schedule a Consultation
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="group relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-foreground/5 p-4 md:p-8 flex flex-col gap-4 border border-foreground/10">
              <div className="flex gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-background rounded-xl p-4 shadow-sm border border-foreground/5 h-full" />
                <div className="grid grid-rows-2 gap-4 h-full">
                  <div className="bg-primary/5 rounded-xl border border-primary/10" />
                  <div className="bg-foreground/5 rounded-xl border border-foreground/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section animated className="bg-foreground/5 py-32 rounded-[3rem] mx-4 sm:mx-8 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-[100rem]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-foreground/60">Comprehensive solutions tailored to elevate your business above the competition.</p>
            </div>
            <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Services
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Consulting", icon: <Users className="h-8 w-8 text-blue-500" /> },
              { title: "Architecture", icon: <Layers className="h-8 w-8 text-purple-500" /> },
              { title: "Training", icon: <BookOpen className="h-8 w-8 text-orange-500" /> },
            ].map((service, i) => (
              <Card key={i} className="hover:-translate-y-2 transition-all duration-300">
                <div className="mb-6 p-4 rounded-2xl bg-foreground/5 w-fit">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-foreground/60">Delivering excellence and deep industry knowledge to supercharge your outcomes.</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
