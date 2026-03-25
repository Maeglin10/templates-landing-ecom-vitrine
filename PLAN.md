# PLAN — templates-landing-ecom-vitrine

> Objectif : un repo **plug-and-play** qui permet, pour chaque nouveau client,
> de n'avoir qu'à faire la **configuration** (env, textes, couleurs) + le
> **design** (images, fonts, branding) sans retoucher la logique.

---

## État actuel — audit du 2026-03-25

### Score global : ⭐⭐⭐⭐ (4/5) — ~85 % plug-and-play

| App         | État | Bloquants avant prod         |
|-------------|------|------------------------------|
| **landing** | 85 % | Email newsletter non envoyé  |
| **website** | 80 % | Email contact non envoyé, blog statique |
| **ecommerce** | 60 % | Stripe non intégré, pages manquantes, DB non migrée |

---

## Ce qui fonctionne parfaitement

- ✅ Architecture Turborepo (pnpm workspaces, turbo.json, paths alias)
- ✅ TypeScript strict sur tous les packages
- ✅ `@repo/ui` — 5 composants polished (Button, Card, Input, Section, Container)
- ✅ `@repo/forms` — `useFormBuilder` avec validation Zod
- ✅ `@repo/config` — theme, siteConfig, tailwind-config partagé
- ✅ `@repo/lib` — formatCurrency, formatDate, slugify, validators Zod, ApiClient
- ✅ `@repo/analytics` — abstraction GA + Meta Pixel
- ✅ Formulaires fonctionnels (newsletter, contact, checkout)
- ✅ CartContext + localStorage (ecommerce)
- ✅ Design 2026 premium sur les 3 apps
- ✅ Routing App Router (Next.js 14), ISG blog, dynamic metadata

---

## Problèmes bloquants (à corriger avant de livrer un client)

### CRITIQUE — logique métier manquante

| # | Problème | Fichier | Fix attendu |
|---|----------|---------|-------------|
| 1 | **Stripe** non intégré | `apps/ecommerce/src/app/api/checkout/route.ts` | Créer Stripe Checkout Session, webhook handler |
| 2 | **Email newsletter** non envoyé | `apps/landing/src/app/api/newsletter/route.ts` | Intégrer Resend + modèle Prisma `Newsletter` |
| 3 | **Email contact** non envoyé | `apps/website/src/app/api/contact/route.ts` | Intégrer Resend |
| 4 | **Prisma DB** non migrée | `apps/ecommerce/prisma/schema.prisma` | `prisma migrate dev`, seed, générer le client |
| 5 | **Page produit** `/products/[slug]` manquante | `apps/ecommerce/src/app/products/` | Créer la page avec add-to-cart |
| 6 | **Page panier** `/cart` vide | `apps/ecommerce/src/app/cart/page.tsx` | Affichage + update quantité |
| 7 | **Page account** `/account` vide | `apps/ecommerce/src/app/account/page.tsx` | Auth + historique commandes |

### HAUTE PRIORITÉ — incohérences

| # | Problème | Fichier | Fix attendu |
|---|----------|---------|-------------|
| 8 | `useCart` hook **dupliqué** | `apps/ecommerce/src/hooks/useCart.ts` | Supprimer, utiliser `useCart` du CartContext |
| 9 | Scripts **Google Analytics + Meta Pixel** absents | `layout.tsx` de chaque app | Ajouter via `next/script` |
| 10 | `siteConfig` non utilisé dans les layouts | `apps/*/src/app/layout.tsx` | Brancher metadata sur `createSiteConfig()` |
| 11 | `next-themes` installé mais non utilisé | `package.json` root | Implémenter dark mode toggle ou supprimer |
| 12 | Pages d'erreur manquantes | chaque app | Créer `error.tsx`, `loading.tsx`, `not-found.tsx` |

### BASSE PRIORITÉ — qualité

| # | Problème | Fix attendu |
|---|----------|-------------|
| 13 | Aucune validation serveur sur les APIs (Zod) | Ajouter `contactFormSchema.parse()` dans chaque route |
| 14 | `next/image` non utilisé (placeholder URLs) | Remplacer par images réelles + optimisation |
| 15 | Pas de rate limiting sur les routes API | Middleware ou upstash/ratelimit |
| 16 | Markdown blog basique (split string) | MDX ou lib `marked` |
| 17 | `react-hook-form` + `@hookform/resolvers` installés mais non utilisés | Supprimer (useFormBuilder suffit) |
| 18 | `useApi` + `useConfig` hooks inutilisés dans `@repo/lib` | Supprimer ou utiliser |

---

## Ce qu'il faut faire pour atteindre 100 % plug-and-play

### Phase 1 — Logique métier complète (priorité absolue)

```
[ ] 1. Intégrer Stripe Checkout dans /api/checkout (ecommerce)
        → stripe.checkout.sessions.create()
        → Redirect vers Stripe hosted page
        → Webhook /api/webhooks/stripe pour confirmer commande

[ ] 2. Intégrer Resend pour emails transactionnels
        → Newsletter signup (landing) → email de bienvenue
        → Contact form (website) → email au client + accusé de réception
        → Confirmation de commande (ecommerce)

[ ] 3. Prisma DB opérationnelle
        → Script setup one-liner dans README
        → prisma migrate dev (ecommerce)
        → prisma db seed avec données exemples

[ ] 4. Pages ecommerce manquantes
        → /products/[slug] : galerie, description, add-to-cart
        → /cart : items, quantités, total, go to checkout
        → /account : auth basique + historique commandes (ou simplement "coming soon" si auth hors scope)
```

### Phase 2 — Qualité & cohérence (avant livraison client)

```
[ ] 5. Supprimer useCart hook dupliqué
[ ] 6. Brancher siteConfig dans tous les layouts
[ ] 7. Ajouter Scripts GA + Meta Pixel dans layout.tsx (next/script)
[ ] 8. Ajouter error.tsx / loading.tsx / not-found.tsx dans les 3 apps
[ ] 9. Validation Zod côté serveur dans chaque route API
[ ] 10. Supprimer dépendances inutilisées (react-hook-form, @hookform/resolvers, next-themes si non utilisé)
```

### Phase 3 — Configuration client (process plug-and-play)

Pour chaque nouveau client, la checklist doit se limiter à :

```
[ ] Copier .env.example → .env.local et remplir :
      DATABASE_URL
      STRIPE_SECRET_KEY / STRIPE_PUBLISHABLE_KEY
      STRIPE_WEBHOOK_SECRET
      RESEND_API_KEY
      NEXT_PUBLIC_GA_ID
      NEXT_PUBLIC_META_PIXEL_ID
      NEXT_PUBLIC_APP_URL

[ ] Éditer packages/config/src/siteConfig.ts :
      name, description, url, ogImage, mail

[ ] Remplacer les images placeholder par les vraies images client

[ ] Adapter le theme dans packages/config/src/theme.ts :
      primary color, fonts

[ ] pnpm install && pnpm db:migrate && pnpm dev
```

---

## Architecture — ce qui est bien fait et à conserver

```
templates-landing-ecom-vitrine/
├── apps/
│   ├── landing/     # Page vitrine marketing  (port 3001)
│   ├── website/     # Site institutionnel     (port 3002)
│   └── ecommerce/   # Boutique en ligne       (port 3003)
└── packages/
    ├── ui/          # Composants React partagés
    ├── forms/       # useFormBuilder hook + Zod
    ├── config/      # theme, siteConfig, tailwind
    ├── lib/         # utils, ApiClient, hooks, validators
    └── analytics/   # abstraction GA + Pixel
```

Cette séparation est excellente :
- Un client landing only → déployer uniquement `apps/landing`
- Un client site+ecommerce → déployer `apps/website` + `apps/ecommerce`
- Tous les packages sont partagés → un seul changement de theme se propage

---

## Dépendances — versions actuelles

| Package | Version | Note |
|---------|---------|------|
| Next.js | 14.0.4 | App Router, stable |
| React | 18.2.0 | |
| TypeScript | 5.9.3 | Strict mode |
| Tailwind CSS | 3.4.19 | |
| Prisma | 5.22.0 | |
| Stripe | 14.25.0 | SDK, non encore utilisé |
| Resend | 3.5.0 | Email, non encore utilisé |
| Framer Motion | 11.18.2 | Animations |
| Zod | 3.25.76 | Validation |
| Turbo | 1.11.1 | Build orchestrator |
| pnpm | 9.0.0 | Package manager |

---

## Temps estimé pour compléter

| Phase | Effort |
|-------|--------|
| Phase 1 — Logique métier | ~20h |
| Phase 2 — Qualité & cohérence | ~8h |
| Phase 3 — Process client documenté | ~2h |
| **Total** | **~30h** |

Une fois Phase 1 + 2 terminées, livrer un client = **< 2h de configuration**.
