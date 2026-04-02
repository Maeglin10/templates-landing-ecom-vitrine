import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Consultez nos conditions générales de vente (CGV).",
};

export default function CGVPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Conditions Générales de Vente (CGV)
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-muted-foreground">
              Les présentes conditions générales de vente définissent les droits et obligations des parties dans le cadre de la vente de services et produits.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Objet</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio quis tellus elementum vestibulum. Suspendisse potenti. Donec non lorem eget diam tincidunt faucibus.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Prix</h2>
              <p>
                Maecenas imperdiet fermentum mi, ac aliquet ex scelerisque id. Praesent rhoncus suscipit arcu, ut bibendum nisl gravida eu. Integer ut sapien in felis fermentum convallis.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Modalités de paiement</h2>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus vitae dolor sem. In laoreet ligula non semper tempor. 
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Rétractation et Remboursement</h2>
              <p>
                Aenean vehicula vel erat in lobortis. Curabitur convallis, odio quis congue sollicitudin, magna mi iaculis leo, id mollis justo ex vel elit.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Responsabilité</h2>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
