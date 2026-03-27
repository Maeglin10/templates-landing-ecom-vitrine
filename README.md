# Production-Grade Turborepo Monorepo

Complete, industrial template system for generating client websites fast.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start all apps
pnpm dev

# Build all apps
pnpm build

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## Apps

| App | Port | Purpose |
|---|---|---|
| `apps/landing` | 3001 | High-conversion lead generation landing pages |
| `apps/website` | 3002 | Professional business websites with blog |
| `apps/ecommerce` | 3003 | Ready-to-sell ecommerce storefronts |

## Packages

| Package | Purpose |
|---|---|
| `@repo/ui` | Minimal UI component library (Button, Card, Input, Section, Container) |
| `@repo/config` | Theme and site configuration management |
| `@repo/lib` | Shared API client, hooks, utilities, validators |
| `@repo/forms` | Dynamic form builder with validation |
| `@repo/analytics` | Event tracking abstraction (Google Analytics, Meta Pixel) |

## Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS
- **Package Manager**: pnpm with workspaces
- **Database**: Prisma + PostgreSQL (optional per app)
- **Payments**: Stripe ready (ecommerce)
- **Forms**: Zod validation
- **Email**: Resend integration ready

## Environment Setup

```bash
cp .env.example .env.local
```

If you deploy apps independently, put a `.env.local` in each app folder (`apps/landing`, `apps/website`, `apps/ecommerce`) or set the same variables in your hosting dashboard for that app.

Required variables:
- `DATABASE_URL` - PostgreSQL connection
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_GA_ID` - Google Analytics
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_DESCRIPTION`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_OG_IMAGE`
- `NEXT_PUBLIC_SITE_EMAIL`

## Project Structure

```
.
├── apps/
│   ├── landing/          # SPA landing page template
│   │   └── src/
│   │       ├── app/      # Next.js app router
│   │       ├── components/
│   │       ├── lib/
│   │       └── styles/
│   ├── website/          # Multi-page business website
│   │   └── src/
│   │       ├── app/
│   │       ├── components/
│   │       ├── lib/
│   │       └── styles/
│   └── ecommerce/        # Full ecommerce platform
│       ├── prisma/       # Database schema
│       └── src/
│           ├── app/
│           ├── components/
│           ├── context/  # React context
│           ├── hooks/
│           ├── lib/
│           └── styles/
├── packages/
│   ├── ui/               # Component library
│   ├── config/           # Theming and config
│   ├── lib/              # API client, utils, hooks
│   ├── forms/            # Form builder
│   └── analytics/        # Event tracking
├── turbo.json            # Turbo configuration
├── tsconfig.base.json    # Shared TypeScript config
├── pnpm-workspace.yaml   # pnpm workspaces
└── .env.example          # Environment template
```

## Key Features

### Landing App
- ✅ Hero section with CTA
- ✅ Features showcase
- ✅ Newsletter subscription
- ✅ API routes for lead capture
- ✅ Analytics tracking
- ✅ SEO optimized

### Website App
- ✅ Multi-page structure (Home, Services, About, Blog, Contact)
- ✅ Blog system with dynamic routing
- ✅ Contact form with validation
- ✅ Responsive grid layout
- ✅ Config-driven styling

### Ecommerce App
- ✅ Product catalog
- ✅ Shopping cart (local state)
- ✅ Checkout flow
- ✅ Prisma models ready (Product, Order, User)
- ✅ Stripe integration hooks
- ✅ Order management

### Shared Packages
- ✅ UI components (Button, Card, Input, Section, Container)
- ✅ API client wrapper
- ✅ Custom hooks (useApi, useConfig)
- ✅ Utilities (format, validation)
- ✅ Form builder with Zod
- ✅ Analytics abstraction

## Development Workflow

### Add a feature to all apps

```bash
# Create a new shared component
# 1. Add to packages/ui/src/components/
# 2. Import in any app from @repo/ui

# Example: Create a shared card component
# It's already done in packages/ui/src/components/Card.tsx
# Import it: import { Card } from '@repo/ui'
```

### Customize theming

Edit `packages/config/src/theme.ts` to globally change colors, spacing, breakpoints, etc.

### Add new app endpoint

Each app has API routes already set up:
- `apps/landing/src/app/api/newsletter/route.ts`
- `apps/website/src/app/api/contact/route.ts`
- `apps/ecommerce/src/app/api/checkout/route.ts`

### Database setup (Ecommerce)

```bash
cd apps/ecommerce

# Generate Prisma client
pnpm prisma:generate

# Create migration
pnpm prisma:migrate

# Seed data (create prisma/seed.ts)
```

## TypeScript Configuration

All apps and packages use strict TypeScript mode:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

Absolute imports configured:
- `@repo/ui` → `packages/ui/src`
- `@repo/config` → `packages/config/src`
- `@repo/lib` → `packages/lib/src`
- `@repo/forms` → `packages/forms/src`
- `@repo/analytics` → `packages/analytics/src`
- `@/*` → `./src/*` (per-app imports)

## Build & Deploy

```bash
# Build all apps
pnpm build

# Start production apps
pnpm start

# CI/CD can run:
pnpm lint      # Run ESLint
pnpm type-check # Run TypeScript checker
pnpm build     # Build all
```

Build outputs:
- `apps/*/. next/` - Next.js optimized builds
- Each app can be deployed independently

## Turbo Pipeline

Configured in `turbo.json`:

```
dev → runs all apps in development mode
build → builds all apps with caching
lint → lints all code
type-check → type checks all code
test → runs all tests (configured for future)
```

## Code Quality

- ESLint configured with Next.js + TypeScript rules
- Prettier for formatting
- No unused variables or parameters
- Absolute imports to avoid relative paths
- Shared utilities prevent duplication
- Rate limiting is in-memory for simplicity; use a shared store (Redis/Upstash) for production-scale traffic.

## Performance

- App Router for optimal bundle sizes
- Image optimization via Next.js
- CSS handling via Tailwind (no runtime)
- Component lazy loading ready
- API caching strategies in place
- Database queries optimized with Prisma

## Production Checklist

- [ ] Database connection tested
- [ ] Environment variables configured
- [ ] Stripe keys set and tested
- [ ] Email provider configured (Resend)
- [ ] Analytics tracking verified
- [ ] SEO metadata reviewed
- [ ] Build passes all checks: `pnpm lint && pnpm type-check && pnpm build`
- [ ] Apps tested on production domains

---

Ready to ship. No explanations needed. Just clone, install, and deploy.
