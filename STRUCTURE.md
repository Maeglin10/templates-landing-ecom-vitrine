# Repository Structure

## Apps (3 templates)

### `/apps/landing` - Lead Generation Landing Page
- **Port**: 3001
- **Purpose**: High-conversion lead capture with CTA-driven design
- **Key Routes**:
  - `/` - Hero + Features + Newsletter
  - `/api/newsletter` - Subscribe endpoint
- **Features**:
  - Hero section with call-to-action
  - Feature showcase grid
  - Newsletter signup form
  - Full Analytics tracking
  - SEO optimized metadata

### `/apps/website` - Multi-Page Business Website  
- **Port**: 3002
- **Purpose**: Professional company/business website with content
- **Key Routes**:
  - `/` - Home page
  - `/services` - Services overview
  - `/about` - Company info
  - `/blog` - Blog index
  - `/blog/[slug]` - Individual blog posts
  - `/contact` - Contact form + API
- **Features**:
  - Navigation header/footer
  - Blog system with static generation
  - Contact form with email
  - Content management ready
  - Mobile responsive

### `/apps/ecommerce` - Full Ecommerce Store
- **Port**: 3003
- **Purpose**: Complete product sales platform with cart & checkout
- **Key Routes**:
  - `/` - Home
  - `/products` - Product listing
  - `/products/[slug]` - Product detail
  - `/cart` - Shopping cart
  - `/checkout` - Order creation
  - `/account` - User account
  - `/api/checkout` - Stripe integration
- **Features**:
  - Product catalog
  - Cart management (local + context)
  - Checkout flow with form validation
  - Prisma database models: User, Product, Category, Order, OrderItem
  - Stripe integration (ready)
  - Order tracking

---

## Packages (5 shared libraries)

### `/packages/ui` - Component Library
**Exports**: Button, Card, Input, Section, Container

```typescript
import { Button, Card, Input, Section, Container } from '@repo/ui';

// Button variants: primary|secondary|outline
// Sizes: sm|md|lg
// Pre-configured Tailwind styling
```

**Files**:
- `src/components/Button.tsx` - CTA button with variants
- `src/components/Card.tsx` - Content card container
- `src/components/Input.tsx` - Form input with error handling
- `src/components/Section.tsx` - Page section wrapper
- `src/components/Container.tsx` - Max-width container

### `/packages/config` - Configuration
**Exports**: theme, createSiteConfig, defaultSiteConfig

```typescript
import { theme } from '@repo/config';
import { createSiteConfig } from '@repo/config';

// Global theme object with colors, fonts, spacing
// Site config for name, description, URLs, OG image
```

**Files**:
- `src/theme.ts` - Colors, fonts, spacing, breakpoints, shadows
- `src/siteConfig.ts` - Site metadata configuration

### `/packages/lib` - Utilities & Hooks
**Exports**: API client, hooks, formatters, validators

```typescript
// API Client
import { createApiClient } from '@repo/lib/api';
const api = createApiClient();
await api.get('/endpoint', { params });
await api.post('/endpoint', { body });

// Hooks
import { useApi, useConfig } from '@repo/lib/hooks';
const { data, loading, call } = useApi();

// Utilities
import { formatCurrency, validateEmail, slugify } from '@repo/lib/utils';

// Validation
import { contactFormSchema, emailSchema } from '@repo/lib/utils';
```

**Files**:
- `src/api/client.ts` - Fetch wrapper with GET/POST/PUT/DELETE
- `src/hooks/useApi.ts` - React hook for API calls with state
- `src/hooks/useConfig.ts` - Config loader hook
- `src/utils/format.ts` - Currency, date, slug, email, truncate
- `src/utils/validators.ts` - Zod schemas for common forms

### `/packages/forms` - Form Builder  
**Exports**: useFormBuilder

```typescript
import { useFormBuilder } from '@repo/forms';

const { formData, errors, loading, success, handleChange, handleSubmit } = useFormBuilder({
  fields: [
    { name: 'email', label: 'Email', type: 'email', required: true }
  ],
  schema: contactFormSchema, // Zod schema (optional)
  onSubmit: async (data) => {
    // Handle submission
  }
});
```

**Files**:
- `src/useFormBuilder.ts` - Dynamic form with validation

### `/packages/analytics` - Event Tracking
**Exports**: trackEvent, trackPageView, trackCustomEvent

```typescript
import { trackEvent, trackPageView, trackCustomEvent } from '@repo/analytics';

trackPageView('/products');
trackCustomEvent('add_to_cart', { productId: '123', quantity: 2 });
```

**Integration**:
- Google Analytics (GA4)
- Meta Pixel
- Console logging for development

**Files**:
- `src/index.ts` - Event tracking abstraction

---

## Root Configuration

### `turbo.json`
Turbo pipeline orchestration:
```json
{
  "pipeline": {
    "dev": { "cache": false, "persistent": true },
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "lint": { "outputs": [] },
    "type-check": { "outputs": [] },
    "test": { "outputs": ["coverage/**"], "cache": true }
  }
}
```

### `pnpm-workspace.yaml`
Workspace configuration:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### `tsconfig.base.json`
Base TypeScript configuration with path aliases:
```json
{
  "paths": {
    "@repo/ui": ["packages/ui/src"],
    "@repo/config": ["packages/config/src"],
    "@repo/lib": ["packages/lib/src"],
    "@repo/forms": ["packages/forms/src"],
    "@repo/analytics": ["packages/analytics/src"],
    "@/*": ["./src/*"]  // Per-app
  }
}
```

---

## Key Characteristics

| Aspect | Implementation |
|--------|---|
| **Language** | TypeScript strict mode |
| **Styling** | TailwindCSS (shared config) |
| **Database** | Prisma + PostgreSQL (ecommerce) |
| **Forms** | Zod validation + useFormBuilder |
| **API** | Next.js API routes |
| **State** | React Context (cart) + localStorage |
| **Analytics** | Multi-provider abstraction |
| **Performance** | App Router, image optimization, eager caching |
| **Code Quality** | ESLint + Prettier + strict TS |

---

## Inter-App Communication

All apps share:
1. **Packages** - Direct imports from `@repo/*`
2. **Styling** - Unified Tailwind config via `tailwind.config.js` extending theme
3. **Types** - Shared TypeScript base config
4. **Linting** - Shared ESLint config
5. **Env** - Common environment setup

---

## Database Models (Ecommerce)

```prisma
User
  id, email, name, createdAt, updatedAt
  └─ orders: Order[]

Product
  id, name, slug, price, image, description, stock
  └─ category: Category
  └─ orderItems: OrderItem[]

Category
  id, name, slug
  └─ products: Product[]

Order
  id, total, status, stripeId, createdAt, updatedAt
  └─ user: User
  └─ items: OrderItem[]

OrderItem
  id, quantity, price
  └─ order: Order
  └─ product: Product
```

---

**Status**: Production-ready. All files created, zero placeholders, TypeScript strict, optimized for scaling.
