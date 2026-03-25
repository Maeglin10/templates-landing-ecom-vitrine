# PLAN — templates-landing-ecom-vitrine

> Objectif : un repo **plug-and-play** qui permet, pour chaque nouveau client,
> de n'avoir qu'à faire la **configuration** (env, textes, couleurs) + le
> **design** (images, fonts, branding) sans retoucher la logique.

---

## État actuel — mis à jour le 2026-03-25

### Score global : ⭐⭐⭐⭐⭐ (5/5) — ~97 % plug-and-play

| App         | État  | Bloquants restants                          |
|-------------|-------|---------------------------------------------|
| **landing** | 97 %  | Données `from:` Resend à personnaliser      |
| **website** | 97 %  | Données `from:` Resend à personnaliser      |
| **ecommerce** | 95 % | Prisma DB à migrer, email `from:` à adapter |

---

## Ce qui est fait (v0.1 → v0.3 complétées)

### Architecture & config
- ✅ Turborepo monorepo (pnpm workspaces, turbo.json, paths alias)
- ✅ TypeScript strict sur tous les packages
- ✅ Scripts `db:generate`, `db:migrate`, `db:seed`, `db:studio` dans root + turbo.json
- ✅ `.env.example` complet (DATABASE_URL, Stripe, Resend, GA, Meta Pixel, CONTACT_EMAIL)

### Packages partagés
- ✅ `@repo/ui` — Button, Card, Input, Section, Container (avec Framer Motion)
- ✅ `@repo/forms` — `useFormBuilder` + validation Zod
- ✅ `@repo/config` — theme, `defaultSiteConfig`, tailwind-config partagé
- ✅ `@repo/lib` — formatCurrency, formatDate, slugify, validators Zod, ApiClient
- ✅ `@repo/analytics` — abstraction GA + Meta Pixel
- ✅ `@repo/db` — singleton PrismaClient partagé + types exportés + script seed

### App Landing
- ✅ Page d'accueil (Hero, Features, Newsletter CTA)
- ✅ Newsletter API → email de bienvenue via Resend (Zod validation)
- ✅ Layout avec siteConfig, GA + Meta Pixel scripts, OG tags
- ✅ `error.tsx`, `loading.tsx`, `not-found.tsx`
- ✅ `sitemap.ts`, `robots.txt`

### App Website
- ✅ Page d'accueil (Hero 2 colonnes, Services, CTA)
- ✅ Blog avec routing dynamique `[slug]`, `generateStaticParams`, `generateMetadata`
- ✅ Page contact avec formulaire (name, email, phone, message)
- ✅ Contact API → 2 emails Resend (propriétaire + accusé de réception visiteur)
- ✅ Layout avec siteConfig, GA + Meta Pixel scripts, OG tags
- ✅ `error.tsx`, `loading.tsx`, `not-found.tsx`
- ✅ `sitemap.ts`, `robots.txt`

### App Ecommerce
- ✅ Page d'accueil premium (navigation sticky, hero, grille produits, quick-add)
- ✅ Page listing `/products` (grille + tri + formatCurrency)
- ✅ Page détail `/products/[slug]` (galerie images, rating, quantité, add-to-cart)
- ✅ Page panier `/cart` (items, quantités, total, CTA checkout)
- ✅ Page checkout `/checkout` → Stripe Checkout hosted redirect
- ✅ Page succès `/checkout/success`
- ✅ Page account `/account` (historique commandes mock, note NextAuth/Clerk)
- ✅ API `/api/checkout` → `stripe.checkout.sessions.create()` (Zod validé)
- ✅ Webhook `/api/webhooks/stripe` → email de confirmation Resend
- ✅ CartContext + localStorage (addItem, removeItem, updateQuantity, clear)
- ✅ Layout avec siteConfig, GA + Meta Pixel scripts, OG tags
- ✅ `error.tsx`, `loading.tsx`, `not-found.tsx`
- ✅ `sitemap.ts`, `robots.txt`
- ✅ `useCart` hook doublon supprimé

---

## Ce qui reste à faire

### À configurer pour chaque client (< 2h)

```
[ ] Copier .env.example → .env.local et remplir :
      DATABASE_URL
      STRIPE_SECRET_KEY / STRIPE_PUBLISHABLE_KEY / STRIPE_WEBHOOK_SECRET
      RESEND_API_KEY
      CONTACT_EMAIL (website)
      NEXT_PUBLIC_GA_ID
      NEXT_PUBLIC_META_PIXEL_ID
      NEXT_PUBLIC_APP_URL

[ ] Éditer packages/config/src/siteConfig.ts :
      name, description, url, ogImage, mail

[ ] Remplacer les emails "from:" dans les routes API :
      newsletter@yourdomain.com → newsletter@domaine-client.com
      orders@yourdomain.com → orders@domaine-client.com
      contact@yourdomain.com → contact@domaine-client.com

[ ] Remplacer les images placeholder par les vraies images client

[ ] Adapter le theme dans packages/config/src/theme.ts :
      primary color, fonts éventuellement

[ ] Setup base de données :
      pnpm db:migrate
      pnpm db:seed (optionnel, données exemple)

[ ] pnpm install && pnpm dev
```

### Améliorations futures optionnelles

| # | Amélioration | Priorité |
|---|--------------|----------|
| 1 | Authentification complète (NextAuth.js ou Clerk) | Moyenne |
| 2 | `next/image` sur toutes les images (WebP, blur) | Moyenne |
| 3 | Blog CMS headless (Contentful, Sanity, ou `.mdx`) | Basse |
| 4 | Supprimer deps inutilisées root (`react-hook-form`, `next-themes`) | Basse |
| 5 | Unit tests (Vitest) sur `@repo/lib`, `@repo/forms` | Basse |
| 6 | E2E tests (Playwright) sur le checkout flow | Basse |
| 7 | Score Lighthouse > 90 sur les 3 apps | Basse |
| 8 | Rate limiting sur les routes API | Basse |

---

## Architecture finale

```
templates-landing-ecom-vitrine/
├── apps/
│   ├── landing/       # Page vitrine marketing  (port 3001)
│   ├── website/       # Site institutionnel     (port 3002)
│   └── ecommerce/     # Boutique en ligne       (port 3003)
└── packages/
    ├── ui/            # Composants React partagés (Button, Card, Input, Section, Container)
    ├── forms/         # useFormBuilder hook + Zod
    ├── config/        # theme, defaultSiteConfig, tailwind-config
    ├── lib/           # utils, ApiClient, hooks, validators
    ├── analytics/     # abstraction GA + Meta Pixel
    └── db/            # PrismaClient singleton + schema + seed
```

---

## Commandes de démarrage client

```bash
# 1. Installer les dépendances
pnpm install

# 2. Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local

# 3. Setup base de données
pnpm db:migrate
pnpm db:seed   # optionnel

# 4. Lancer en dev
pnpm dev
# landing → http://localhost:3001
# website → http://localhost:3002
# ecommerce → http://localhost:3003
```
