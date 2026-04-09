# 🚀 Guide de démarrage client — Template Landing / Vitrine / Ecommerce

> Objectif : configurer et déployer **les 3 applications** en moins de 2 heures.

---

## Étape 1 — Cloner et installer

```bash
git clone https://github.com/Maeglin10/templates-landing-ecom-vitrine.git
cd templates-landing-ecom-vitrine
pnpm install
```

> **Pré-requis** : Node.js ≥ 20, pnpm ≥ 9

---

## Étape 2 — Personnaliser la config

Ouvrir `packages/config/src/siteConfig.ts` et remplacer :

| Champ | Description |
|-------|-------------|
| `name` | Nom de l'entreprise / projet |
| `description` | Slogan ou description courte |
| `url` | URL de production (ex: `https://monsite.com`) |
| `ogImage` | URL de l'image Open Graph par défaut |
| `contactEmail` | Email de contact |

Les 3 applications lisent automatiquement cette config.

---

## Étape 3 — Variables d'environnement

Copier les fichiers d'exemple :

```bash
cp .env.example .env.local
cp apps/ecommerce/.env.example apps/ecommerce/.env.local
```

### Variables requises

| Variable | Service | Où l'obtenir |
|----------|---------|-------------|
| `DATABASE_URL` | PostgreSQL | [neon.tech](https://neon.tech) (free tier) |
| `STRIPE_SECRET_KEY` | Stripe | [stripe.com/dashboard](https://dashboard.stripe.com) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe | Même dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI | `stripe listen --forward-to ...` |
| `RESEND_API_KEY` | Resend | [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | Resend | Domaine vérifié sur Resend |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk | [clerk.com](https://clerk.com) |
| `CLERK_SECRET_KEY` | Clerk | Même dashboard |

### Variables optionnelles

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel / Facebook |
| `CONTACT_EMAIL` | Override pour le destinataire du formulaire contact |

---

## Étape 4 — Base de données

```bash
# Générer le client Prisma
pnpm db:generate

# Créer les tables dans Neon
pnpm db:migrate

# (Optionnel) Remplir avec des données de démo
pnpm db:seed
```

---

## Étape 5 — Lancer en local

```bash
pnpm dev
```

Les 3 apps tournent sur :
- **Landing** : http://localhost:3001
- **Website** : http://localhost:3002
- **Ecommerce** : http://localhost:3003

---

## Étape 6 — Tester Stripe en local

```bash
# Terminal 1 : serveur dév
pnpm dev

# Terminal 2 : proxy webhook
stripe listen --forward-to localhost:3003/api/webhooks/stripe
```

Copier le `whsec_...` affiché et le mettre dans `STRIPE_WEBHOOK_SECRET`.

---

## Étape 7 — Branding

### Couleurs & thème
Modifier les palettes dans `packages/config/src/palettes.ts`.

### Logo & images
Remplacer les fichiers dans `apps/*/public/`.

### Textes
Les pages sont dans `apps/*/src/app/` — modifier directement les composants React.

---

## Étape 8 — Déployer sur Vercel

```bash
# Depuis la racine du monorepo
npx vercel --prod
```

Ou déployer chaque app séparément via le dashboard Vercel :
1. Importer le repo GitHub
2. Configurer le **Root Directory** : `apps/landing`, `apps/website`, ou `apps/ecommerce`
3. Ajouter toutes les variables d'env dans Settings > Environment Variables

### Coûts (free tier)
| Service | Gratuit |
|---------|---------|
| Vercel | 100 GB bandwidth, déploiements illimités |
| Neon | 0.5 GB PostgreSQL |
| Clerk | 10 000 MAU |
| Resend | 3 000 emails/mois |
| Stripe | 0 € (commission par transaction uniquement) |

---

## Checklist de livraison

- [ ] `siteConfig.ts` personnalisé (nom, URL, description)
- [ ] Palettes de couleurs adaptées au client
- [ ] Logo + favicon remplacés dans les 3 `public/`
- [ ] Variables d'env configurées sur Vercel
- [ ] Base de données Neon créée + migrée
- [ ] Produits ajoutés via seed ou admin
- [ ] Webhook Stripe configuré en production (dashboard Stripe → Webhooks)
- [ ] Domaine personnalisé lié sur Vercel
- [ ] Test checkout complet end-to-end
- [ ] RGPD - Politique de confidentialité + CGV personnalisées
