import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OnboardingFlow } from "@/components/OnboardingFlow";

export const metadata: Metadata = {
  title: "Configuration de votre projet",
  description: "Dites-nous en plus sur votre projet pour que nous puissions le configurer.",
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Bienvenue à bord !
            </h1>
            <p className="text-lg text-muted-foreground">
              Commençons par configurer les informations principales de votre futur site web.
              Cette étape ne prendra que quelques instants.
            </p>
          </div>
          
          <OnboardingFlow />
        </div>
      </main>
      <Footer />
    </div>
  );
}
