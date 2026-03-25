# ROADMAP — templates-landing-ecom-vitrine

> Feuille de route pour atteindre un template **100 % plug-and-play** :
> configuration client en < 2h, zéro retouche de logique.

---

## Légende

| Symbole | Signification |
|---------|---------------|
| ✅ | Fait |
| 🔧 | En cours / à corriger |
| ⬜ | À faire |
| 💡 | Futur / nice-to-have |

---

## v0.1 — Base (état actuel — 2026-03-25)

- ✅ Turborepo monorepo (pnpm workspaces)
- ✅ 3 apps Next.js 14 (landing, website, ecommerce)
- ✅ 5 packages partagés (ui, forms, config, lib, analytics)
- ✅ TypeScript strict sur l'ensemble du projet
- ✅ Design 2026 premium sur les 3 apps
- ✅ Formulaires fonctionnels (newsletter, contact, checkout UI)
- ✅ CartContext + localStorage (ecommerce)
- ✅ `@repo/ui` — Button, Card, Input, Section, Container
- ✅ `useFormBuilder` + validation Zod
- ✅ Schema Prisma (User, Product, Category, Order, OrderItem)
- ✅ `.env.example` complet
- ✅ README documenté

---

## v0.2 — Logique métier complète ⬜

> **Priorité : HAUTE** — Sans cette version, le template n'est pas livrable.

### Ecommerce

- ⬜ **Page `/products/[slug]`** — galerie images, description, variants, add-to-cart
- ⬜ **Page `/cart`** — liste des items, update quantité, total, CTA checkout
- ⬜ **Stripe Checkout** — `stripe.checkout.sessions.create()` dans `/api/checkout`
- ⬜ **Webhook Stripe** — `/api/webhooks/stripe` → confirmer commande en DB
- ⬜ **Email confirmation commande** — Resend après paiement confirmé
- ⬜ **Prisma migrations** — `prisma migrate dev` + seed données exemple

### Landing

- ⬜ **Email newsletter** — Resend : email de bienvenue à l'abonné
- ⬜ **Modèle Prisma `Newsletter`** — stocker les emails

### Website

- ⬜ **Email contact** — Resend : email au propriétaire + accusé de réception au visiteur

---

## v0.3 — Qualité & cohérence ⬜

> **Priorité : HAUTE** — Fiabilité + maintenabilité du template.

- ⬜ Supprimer `apps/ecommerce/src/hooks/useCart.ts` (doublon de CartContext)
- ⬜ Brancher `siteConfig` dans les `layout.tsx` des 3 apps (metadata dynamiques)
- ⬜ Ajouter `next/script` pour Google Analytics dans les 3 layouts
- ⬜ Ajouter `next/script` pour Meta Pixel dans les 3 layouts
- ⬜ Créer `error.tsx` dans les 3 apps (error boundary)
- ⬜ Créer `loading.tsx` dans les 3 apps (skeleton)
- ⬜ Créer `not-found.tsx` dans les 3 apps (404 custom)
- ⬜ Validation Zod côté serveur dans chaque route API
- ⬜ Supprimer dépendances inutilisées (`react-hook-form`, `@hookform/resolvers`)
- ⬜ Supprimer ou implémenter `next-themes` (dark mode toggle)
- ⬜ Rate limiting sur les routes API sensibles (newsletter, contact, checkout)

---

## v0.4 — Page Account & Auth ⬜

> **Priorité : MOYENNE** — Nécessaire pour ecommerce complet.

- ⬜ Choisir la stratégie auth : NextAuth.js (sessions) ou Clerk (hosted)
- ⬜ Page `/account` — profil, historique commandes, adresses
- ⬜ Protéger `/account` avec middleware auth
- ⬜ Lier les commandes Stripe au compte utilisateur
- ⬜ Flow "mot de passe oublié" via Resend

---

## v0.5 — Optimisation & SEO ⬜

> **Priorité : MOYENNE** — Important pour la livraison client.

- ⬜ `next/image` sur toutes les images (optimisation WebP, blur placeholder)
- ⬜ Sitemap dynamique (`next-sitemap` ou route `/sitemap.xml`)
- ⬜ `robots.txt`
- ⬜ Open Graph + Twitter Card via `siteConfig` dans tous les layouts
- ⬜ Canonical URLs
- ⬜ Score Lighthouse > 90 sur les 3 apps

---

## v0.6 — Blog CMS ⬜

> **Priorité : BASSE** — Amélioration du website.

- ⬜ Remplacer les posts statiques par un CMS headless (options : Contentful, Sanity, ou fichiers `.mdx`)
- ⬜ Rendering MDX avec syntax highlighting (si articles techniques)
- ⬜ Pagination des articles
- ⬜ Catégories / tags
- ⬜ Recherche full-text

---

## v0.7 — Tests & CI/CD ⬜

> **Priorité : BASSE** — Fiabilité long terme.

- ⬜ Unit tests (Vitest) sur `@repo/lib` et `@repo/forms`
- ⬜ Tests de composants (Testing Library) sur `@repo/ui`
- ⬜ E2E tests (Playwright) — checkout flow, contact form, newsletter
- ⬜ GitHub Actions CI (lint, type-check, build, test)
- ⬜ Preview deployments (Vercel)

---

## v1.0 — Template stable et documenté 💡

> Milestone : le template est **100 % plug-and-play**.

- ⬜ Guide de démarrage client (< 10 étapes, < 2h)
- ⬜ Documentation de chaque `@repo/*` package
- ⬜ Checklist de livraison client (branding, env, textes, images)
- ⬜ Changelog maintenu
- ⬜ Versionnement sémantique des packages partagés

---

## Futures extensions 💡

Ces features ne sont pas dans le scope immédiat mais peuvent être ajoutées comme modules optionnels :

| Feature | Description |
|---------|-------------|
| **Multi-langue** | i18n avec `next-intl` |
| **Admin dashboard** | Gestion produits, commandes, contacts |
| **Subscription** | Abonnements récurrents Stripe (SaaS/membership) |
| **Live streaming** | Intégration HLS player + WebSocket chat (projet SkyLive) |
| **Push notifications** | Web push pour nouveaux produits ou promotions |
| **A/B testing** | Variants de pages landing |
| **Affiliate tracking** | Liens affiliés avec cookies |
| **Review system** | Avis produits avec modération |

---

## Prochaine session de travail

Commencer par **v0.2** dans cet ordre :

1. Pages ecommerce manquantes (`/products/[slug]`, `/cart`)
2. Stripe Checkout + Webhook
3. Resend emails (newsletter, contact, commande)
4. Prisma migrations + seed

Puis enchaîner sur **v0.3** pour la qualité.
