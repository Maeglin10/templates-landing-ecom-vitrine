# PROCHAINES ÉTAPES (NEXT STEPS)

> Mis à jour : 2026-04-09 — Template **production-ready**.

## ✅ Ce qui est fait (v0.1 → v1.0)

| Version | Description | Status |
|---------|-------------|--------|
| v0.1 | Turborepo base, 3 apps Next.js, TypeScript strict, `@repo/ui` | ✅ |
| v0.2 | Stripe Checkout, webhooks, emails Resend, Prisma DB | ✅ |
| v0.3 | Validation Zod, sitemap, robots.txt, error/loading/not-found | ✅ |
| v0.4 | Auth Clerk, middleware `/account`, lien Stripe → userId | ✅ |
| v0.5 | OG images dynamiques (`/api/og`), canonical URLs, SEO | ✅ |
| v0.7 | Nettoyage deps (confirmé clean), rate limiting actif | ✅ |
| v0.8 | GitHub Actions CI (`lint`, `type-check`, `build`) | ✅ |
| v1.0 | Guide client 8 étapes + checklist livraison | ✅ |

## ⬜ Ce qu'il reste (nice-to-have)

### v0.6 — Blog CMS
- Remplacer les articles statiques par un CMS headless (Sanity free tier ou fichiers `.mdx` avec Contentlayer)
- Pagination des articles
- Catégories / tags

### Tests unitaires & E2E
- Unit tests (Vitest) sur `@repo/lib` et `@repo/forms`
- Tests composants (Testing Library) sur `@repo/ui`
- E2E tests (Playwright) — checkout flow, contact form, newsletter

### Documentation @repo/*
- README individuel pour chaque package : `@repo/ui`, `@repo/lib`, `@repo/config`, `@repo/db`, `@repo/forms`, `@repo/auth`, `@repo/analytics`

## 🚀 Déployer maintenant

Le template est **100% prêt**. Suivre le guide :
→ [`docs/CLIENT_GUIDE.md`](./docs/CLIENT_GUIDE.md)
