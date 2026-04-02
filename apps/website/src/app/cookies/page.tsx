import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { CookiePreferences } from "@/components/CookiePreferences";

export const metadata: Metadata = {
  title: "Politique de Cookies",
  description: "Notre politique d'utilisation des cookies et vos préférences.",
};

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            Politique de Cookies
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-muted-foreground">
              La présente politique a pour but de vous informer sur l'utilisation des cookies sur notre site, conformément aux directives européennes (RGPD).
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web ou de la consultation d'une publicité. Il a pour but de collecter des informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Quels cookies utilisons-nous ?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cookies strictement nécessaires :</strong> Ces cookies sont indispensables au bon fonctionnement du site et ne peuvent pas être désactivés.
                </li>
                <li>
                  <strong>Cookies de performance :</strong> Ces cookies nous permettent de mesurer l'audience de notre site, de savoir quelles pages sont les plus consultées et d'améliorer nos services.
                </li>
                <li>
                  <strong>Cookies de fonctionnalité :</strong> Ces cookies permettent d'améliorer les fonctionnalités et la personnalisation de notre site.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Gérer vos préférences de cookies</h2>
              <p>
                Vous pouvez à tout moment modifier vos préférences de cookies. 
                Si vous avez refusé les cookies par défaut, certains services de notre site pourraient ne pas fonctionner de manière optimale.
              </p>
              
              <div className="mt-8 p-6 bg-muted rounded-lg border">
                <h3 className="text-xl font-medium mb-4">Vos préférences actuelles</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Vous pouvez révoquer ou accepter l'utilisation des cookies non essentiels à tout moment.
                </p>
                <CookiePreferences />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
