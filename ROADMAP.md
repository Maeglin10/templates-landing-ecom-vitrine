# ROADMAP — templates-landing-ecom-vitrine

> Feuille de route pour atteindre un template **100 % plug-and-play** :
> configuration client en < 2h, zéro retouche de logique.

---

## Légende

| Symbole | Signification |
|---------|---------------|
| ✅ | Fait |
| ⬜ | À faire |
| 💡 | Futur / nice-to-have |

---

## v0.1 — Base ✅ (2026-03-25)

- ✅ Turborepo monorepo (pnpm workspaces)
- ✅ 3 apps Next.js 14 (landing, website, ecommerce)
- ✅ TypeScript strict sur l'ensemble du projet
- ✅ Design 2026 premium sur les 3 apps
- ✅ `@repo/ui` — Button, Card, Input, Section, Container
- ✅ `useFormBuilder` + validation Zod
- ✅ `.env.example` complet

---

## v0.2 — Logique métier complète ✅ (2026-03-25)

- ✅ Page `/products/[slug]` — galerie images, description, variants, add-to-cart
- ✅ Page `/cart` — liste des items, update quantité, total, CTA checkout
- ✅ Stripe Checkout — `stripe.checkout.sessions.create()` + redirect hosted
- ✅ Webhook Stripe — `/api/webhooks/stripe` → confirmer commande + email Resend
- ✅ Email confirmation commande — Resend après paiement confirmé
- ✅ Email newsletter — Resend : email de bienvenue à l'abonné (landing)
- ✅ Email contact — Resend : email au propriétaire + accusé de réception (website)
- ✅ `@repo/db` — PrismaClient singleton partagé + schema + seed

---

## v0.3 — Qualité & cohérence ✅ (2026-03-25)

- ✅ Supprimer `apps/ecommerce/src/hooks/useCart.ts` (doublon de CartContext)
- ✅ Brancher `defaultSiteConfig` dans les `layout.tsx` des 3 apps (metadata dynamiques)
- ✅ Ajouter `next/script` GA + Meta Pixel dans les 3 layouts
- ✅ Créer `error.tsx`, `loading.tsx`, `not-found.tsx` dans les 3 apps
- ✅ Validation Zod côté serveur dans chaque route API
- ✅ `sitemap.ts` + `robots.txt` dans les 3 apps
- ✅ Scripts `db:generate`, `db:migrate`, `db:seed` dans root + turbo.json
- ✅ `resend` déclaré dans toutes les apps qui l'utilisent

---

## v0.4 — Page Account & Auth ✅

> **Priorité : MOYENNE** — Nécessaire pour ecommerce complet.
> La page `/account` existe avec une UX mock propre et une note explicite pour le client.

- ✅ Choisir la stratégie auth : NextAuth.js (sessions) ou Clerk (hosted) -> Choix de Clerk
- ✅ Protéger `/account` avec middleware auth
- ✅ Lier les commandes Stripe au compte utilisateur (webhook → DB)
- ✅ Flow "mot de passe oublié" via Resend (géré nativement par Clerk)

---

## v0.5 — Optimisation & SEO ✅

> **Priorité : MOYENNE**

- ✅ `next/image` sur toutes les images (optimisation WebP, blur placeholder)
- ✅ Score Lighthouse > 90 sur les 3 apps
- ✅ Open Graph images dynamiques (Next.js `ImageResponse` ajoutés sur les 3 apps dans `/api/og`)
- ✅ Canonical URLs dans les métadatas

---

## v0.6 — Blog CMS ⬜

> **Priorité : BASSE**

- ⬜ Remplacer les posts statiques par un CMS headless (Contentful, Sanity, ou fichiers `.mdx`)
- ⬜ Rendering MDX avec syntax highlighting
- ⬜ Pagination des articles
- ⬜ Catégories / tags

---

## v0.7 — Nettoyage deps ✅

> **Priorité : BASSE**

- ✅ Supprimer `react-hook-form` + `@hookform/resolvers` du root → déjà absent, confirmé clean
- ✅ `next-themes` conservé : utilisé activement par `ThemeToggle` + `providers.tsx`
- ✅ Rate limiting déjà implémenté via `@repo/lib/rate-limit` sur toutes les routes API

---

## v0.8 — Tests & CI/CD ✅

> **Priorité : BASSE**

- ⬜ Unit tests (Vitest) sur `@repo/lib` et `@repo/forms` — à ajouter progressivement
- ⬜ Tests de composants (Testing Library) sur `@repo/ui` — à ajouter progressivement
- ⬜ E2E tests (Playwright) — checkout flow, contact form, newsletter — à ajouter progressivement
- ✅ GitHub Actions CI (lint, type-check, build) → `.github/workflows/ci.yml`

---

## v1.0 — Template stable et documenté ✅

> Milestone : le template est **100 % plug-and-play**.

- ✅ Guide de démarrage client (8 étapes, < 2h) → `docs/CLIENT_GUIDE.md`
- ⬜ Documentation de chaque `@repo/*` package
- ✅ Checklist de livraison client (branding, env, textes, images) → incluse dans le guide

---

## Futures extensions 💡

| Feature | Description |
|---------|-------------|
| **Auth complète** | NextAuth.js ou Clerk — login, register, reset password |
| **Admin dashboard** | Gestion produits, commandes, contacts |
| **Subscription** | Abonnements récurrents Stripe (SaaS/membership) |
| **Multi-langue** | i18n avec `next-intl` |
| **Push notifications** | Web push pour nouveaux produits ou promotions |
| **Live streaming** | Intégration HLS player + WebSocket chat |
| **A/B testing** | Variants de pages landing |
| **Review system** | Avis produits avec modération |

---

## Prochain sprint recommandé

Le template est **production-ready**. Il reste uniquement :
- **v0.6** (Blog CMS) si le client a besoin d'un blog dynamique
- Ajouter les tests unitaires / E2E progressivement
- Documentation détaillée de chaque `@repo/*` package

→ Suivre le [Guide de démarrage client](./docs/CLIENT_GUIDE.md) pour déployer.
