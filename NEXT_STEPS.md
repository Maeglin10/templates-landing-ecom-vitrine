# PROCHAINES ÉTAPES (NEXT STEPS)

> Fichier de transfert pour reprendre proprement le développement après le dernier commit de finalisation v0.4 / v0.5.

## 1. Ce qui est finalisé (et qui sera dans ce commit)
- **Authentification via Clerk** connectée sur `apps/ecommerce`.
- **E-mails Resend** testés et unifiés avec la variable d'environnement `RESEND_FROM_EMAIL`.
- Lien entre le **Checkout Stripe** et les identifiants Clerk sauvegardé (metadata: `userId`).
- **Open Graph Dynamique** (Next.js ImageResponse) intégré dans `/api/og` sur les trois apps.
- **Base de Données Neon + Vercel / Instructions locales** documentées dans `apps/ecommerce/.env.example`.

## 2. Ce qu'il reste à faire dans le Sprint courant (v0.6 - v1.0)
Si tu souhaites poursuivre avant le déploiement final :

- **[v0.6] CMS pour le Blog** : Remplacer l'approche temporaire statique (`docs/plans` ou placeholders) par une véritable architecture (Contentlayer, MDX ou Sanity) pour alimenter les articles. Pagination et catégories à monter.
- **[v0.7] Nettoyage et Sécurité** : 
  - Nettoyer les packages inutilisés (`react-hook-form` éventuel).
  - Activer un outil de Rate Limiting si Upstash te semble pertinent sur Vercel.
- **[v0.8] Standardisation Tests & CI/CD** : Mettre en place Playwright + fichier GitHub Action pour prévenir les dysfonctionnements front-end lors des prochaines itérations.
- **[v1.0] Document de Transmission Client** : Rédiger le guide interne pour utiliser ce template (les étapes depuis l'abonnement Vercel jusqu'à la mise en ligne, et quelles variables configurer).

## 3. Déploiement immédat
Tout est stable :
- Assure-toi de remplir les variables Neon, Resend, Stripe, Clerk côté Vercel.
- Commande `vercel deploy --prod` à la racine ou sur l'app de ton choix.
