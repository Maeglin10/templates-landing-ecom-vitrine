# Auth + Admin + Blog + Frontend Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add NextAuth.js auth with roles, a custom admin panel for products + blog, a skybot-inbox webhook for auto-generated articles, and frontend UX improvements to make the template commercially competitive.

**Architecture:** 4 sequential agents, each ending with 1 git commit. Auth is the foundation — it must land first. Admin panel depends on auth. Blog depends on the BlogPost schema from auth's migration. Frontend improvements are last and partially independent.

**Tech Stack:** Next.js 14 App Router, NextAuth v4, Prisma 5, PostgreSQL, Cloudinary (next-cloudinary), @uiw/react-md-editor, sonner (toasts), next-themes (dark mode)

---

## AGENT 1 — Auth (NextAuth.js + Roles)

### Task 1: Update Prisma schema

**Files:**
- Modify: `packages/db/prisma/schema.prisma`

**Step 1: Replace schema content**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?
  role          Role      @default(EDITOR)
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  blogPosts     BlogPost[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Product {
  id          String      @id @default(cuid())
  name        String
  description String
  slug        String      @unique
  price       Decimal     @db.Decimal(10, 2)
  images      String[]
  category    Category    @relation(fields: [categoryId], references: [id])
  categoryId  String
  stock       Int         @default(0)
  tags        String[]
  orderItems  OrderItem[]
  reviews     Review[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String?
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
}

model Category {
  id       String    @id @default(cuid())
  name     String    @unique
  slug     String    @unique
  products Product[]
}

model Order {
  id        String      @id @default(cuid())
  user      User        @relation(fields: [userId], references: [id])
  userId    String
  items     OrderItem[]
  total     Decimal     @db.Decimal(10, 2)
  status    String      @default("pending")
  stripeId  String?
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum PostSource {
  MANUAL
  SKYBOT
}

enum AppTarget {
  ECOMMERCE
  WEBSITE
}

model BlogPost {
  id          String     @id @default(cuid())
  title       String
  slug        String     @unique
  excerpt     String?
  content     String     @db.Text
  coverImage  String?
  status      PostStatus @default(DRAFT)
  source      PostSource @default(MANUAL)
  appTarget   AppTarget
  authorId    String
  author      User       @relation(fields: [authorId], references: [id])
  metaTitle   String?
  metaDesc    String?
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

**Step 2: Run migration**

```bash
cd /path/to/project
pnpm db:migrate
# When prompted, name it: "add_auth_blog_reviews_roles"
```

Expected: migration file created in `packages/db/prisma/migrations/`, Prisma client regenerated.

---

### Task 2: Create `packages/auth` package

**Files:**
- Create: `packages/auth/package.json`
- Create: `packages/auth/src/index.ts`
- Create: `packages/auth/src/auth.config.ts`
- Create: `packages/auth/src/middleware.ts`
- Create: `packages/auth/tsconfig.json`

**Step 1: `packages/auth/package.json`**

```json
{
  "name": "@repo/auth",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "@repo/db": "workspace:*",
    "bcryptjs": "^2.4.3",
    "next": "^14.0.4",
    "next-auth": "^4.24.5"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "typescript": "^5.3.3"
  }
}
```

**Step 2: `packages/auth/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 3: `packages/auth/src/auth.config.ts`**

```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
```

**Step 4: `packages/auth/src/middleware.ts`**

```typescript
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function withAdminAuth(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const role = token.role as string;
  if (!["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return null;
}

export function requireRole(role: string, userRole: string): boolean {
  const hierarchy = { EDITOR: 1, ADMIN: 2, SUPER_ADMIN: 3 };
  return (hierarchy[userRole as keyof typeof hierarchy] ?? 0) >= (hierarchy[role as keyof typeof hierarchy] ?? 99);
}
```

**Step 5: `packages/auth/src/index.ts`**

```typescript
export { authOptions } from "./auth.config";
export { withAdminAuth, requireRole } from "./middleware";
export type { Session } from "next-auth";
```

**Step 6: Add `@repo/auth` to workspace root and install deps**

In `pnpm-workspace.yaml`, verify `packages/*` is included (it should be).

```bash
cd packages/auth && pnpm install
cd ../.. && pnpm install
```

---

### Task 3: Add `@auth/prisma-adapter` to packages/auth

**Step 1:** In `packages/auth/package.json`, add to dependencies:
```json
"@auth/prisma-adapter": "^1.0.0"
```

Then run: `pnpm install` from the root.

---

### Task 4: Add NextAuth API route to ecommerce app

**Files:**
- Create: `apps/ecommerce/src/app/api/auth/[...nextauth]/route.ts`
- Modify: `apps/ecommerce/package.json` (add `@repo/auth`, `next-auth`)

**Step 1: `apps/ecommerce/src/app/api/auth/[...nextauth]/route.ts`**

```typescript
import { authOptions } from "@repo/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

**Step 2: Add deps to `apps/ecommerce/package.json`**

```json
"@repo/auth": "workspace:*",
"next-auth": "^4.24.5"
```

Then: `pnpm install`

---

### Task 5: Add NextAuth API route to website app

Same as Task 4, for `apps/website`.

**Files:**
- Create: `apps/website/src/app/api/auth/[...nextauth]/route.ts`
- Modify: `apps/website/package.json`

Same content as Task 4, Step 1.

---

### Task 6: Add middleware to protect /admin routes

**Files:**
- Create: `apps/ecommerce/src/middleware.ts`
- Create: `apps/website/src/middleware.ts`

**`apps/ecommerce/src/middleware.ts`:**

```typescript
import { withAdminAuth } from "@repo/auth";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const redirect = await withAdminAuth(req);
    if (redirect) return redirect;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

Same for `apps/website/src/middleware.ts`.

---

### Task 7: Create login page (ecommerce)

**Files:**
- Create: `apps/ecommerce/src/app/auth/login/page.tsx`
- Create: `apps/ecommerce/src/app/auth/error/page.tsx`

**`apps/ecommerce/src/app/auth/login/page.tsx`:**

```tsx
"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";
    router.push(callbackUrl);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-neutral-950">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-black tracking-tighter mb-6">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white rounded-xl py-2 text-sm font-bold hover:bg-stone-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </main>
  );
}
```

**`apps/ecommerce/src/app/auth/error/page.tsx`:**

```tsx
export default function AuthError() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Erreur d&apos;authentification</h1>
        <a href="/auth/login" className="text-stone-600 underline">Réessayer</a>
      </div>
    </main>
  );
}
```

Duplicate these files for `apps/website/src/app/auth/`.

---

### Task 8: Add SessionProvider to app layouts

**Files:**
- Modify: `apps/ecommerce/src/app/layout.tsx`
- Modify: `apps/website/src/app/layout.tsx`

Create a shared providers wrapper. In each app's layout.tsx, add:

```tsx
// Create apps/ecommerce/src/components/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Then wrap `{children}` in layout.tsx with `<Providers>`.

---

### Task 9: Add NEXTAUTH env vars to .env.example

**Files:**
- Modify: `.env.example`

Add:
```env
# Auth
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3003

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Skybot webhook
SKYBOT_WEBHOOK_SECRET=your-webhook-secret
```

---

### Task 10: Commit Agent 1

```bash
git add -A
git commit -m "feat: add NextAuth.js auth with SUPER_ADMIN/ADMIN/EDITOR roles

- packages/auth: NextAuth config, PrismaAdapter, JWT callbacks
- Prisma schema: Role enum, User fields (password/role/emailVerified),
  Account/Session/VerificationToken models, BlogPost, Review,
  Product.images[], Product.tags[]
- /api/auth/[...nextauth] route in ecommerce + website
- middleware protecting /admin/* routes
- /auth/login + /auth/error pages
- SessionProvider in both app layouts
- .env.example updated with auth + cloudinary + skybot vars

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## AGENT 2 — Admin Panel + Product Management

### Task 1: Install deps

**In `apps/ecommerce/package.json`**, add:
```json
"next-cloudinary": "^6.0.0",
"@repo/db": "workspace:*"
```

Run: `pnpm install`

---

### Task 2: Admin layout (ecommerce)

**Files:**
- Create: `apps/ecommerce/src/app/admin/layout.tsx`

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, FileText, Users, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingBag },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const role = (session.user as any).role as string;
  const visibleNav = navItems.filter((item) => {
    if (item.href === "/admin/users") return role === "SUPER_ADMIN";
    if (item.href === "/admin/products" || item.href === "/admin/orders")
      return ["ADMIN", "SUPER_ADMIN"].includes(role);
    return true;
  });

  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-neutral-950">
      <aside className="w-60 bg-white dark:bg-neutral-900 border-r dark:border-neutral-800 flex flex-col p-4 gap-1">
        <div className="px-3 py-4 mb-2">
          <span className="font-black text-lg tracking-tighter">Admin</span>
          <p className="text-xs text-stone-400 mt-0.5">{role}</p>
        </div>
        {visibleNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
        <div className="mt-auto">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
```

---

### Task 3: Admin dashboard page

**Files:**
- Create: `apps/ecommerce/src/app/admin/page.tsx`

```tsx
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { Package, ShoppingBag, Users, FileText } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string;

  const [products, orders, users, posts] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    role === "SUPER_ADMIN" ? prisma.user.count() : Promise.resolve(null),
    prisma.blogPost.count({ where: { appTarget: "ECOMMERCE" } }),
  ]);

  const stats = [
    { label: "Produits", value: products, icon: Package },
    { label: "Commandes", value: orders, icon: ShoppingBag },
    ...(users !== null ? [{ label: "Utilisateurs", value: users, icon: Users }] : []),
    { label: "Articles blog", value: posts, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border dark:border-neutral-800">
            <Icon className="w-5 h-5 text-stone-400 mb-3" />
            <p className="text-3xl font-black">{value}</p>
            <p className="text-sm text-stone-500 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### Task 4: Cloudinary upload API route

**Files:**
- Create: `apps/ecommerce/src/app/api/upload/route.ts`

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "products", resource_type: "image" }, (err, res) => {
        if (err || !res) return reject(err);
        resolve(res);
      })
      .end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
```

Add `"cloudinary": "^1.41.0"` to `apps/ecommerce/package.json` dependencies. Run `pnpm install`.

---

### Task 5: Products list page (admin)

**Files:**
- Create: `apps/ecommerce/src/app/admin/products/page.tsx`

```tsx
import { prisma } from "@repo/db";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tighter">Produits</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-stone-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouveau produit
        </Link>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-neutral-800">
            <tr className="text-left text-stone-500">
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium">Prix</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-800">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-stone-500">{p.category.name}</td>
                <td className="px-4 py-3">{Number(p.price).toFixed(2)} €</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.stock < 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${p.id}/edit`} className="text-stone-400 hover:text-stone-900">
                    <Pencil className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### Task 6: Product form component (shared by new + edit)

**Files:**
- Create: `apps/ecommerce/src/components/admin/ProductForm.tsx`

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  images: string[];
  tags: string[];
}

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Category[];
  initialData?: Partial<ProductFormData> & { id?: string };
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? "",
    stock: initialData?.stock ?? "",
    categoryId: initialData?.categoryId ?? "",
    images: initialData?.images ?? [],
    tags: initialData?.tags ?? [],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: f.slug || generateSlug(name) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      if (url) setForm((f) => ({ ...f, images: [...f.images, url] }));
    }
    setUploading(false);
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setForm((f) => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = initialData?.id ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
    const method = initialData?.id ? "PATCH" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }),
    });
    setSaving(false);
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom *</label>
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={4}
          className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Prix (€) *</label>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock *</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Catégorie *</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          >
            <option value="">Choisir...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium mb-2">Photos</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.images.map((url, i) => (
            <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden">
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="w-24 h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-stone-400 transition-colors text-stone-400">
            <Upload className="w-5 h-5 mb-1" />
            <span className="text-xs">{uploading ? "..." : "Upload"}</span>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">Tags / Filtres</label>
        <div className="flex gap-2 flex-wrap mb-2">
          {form.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 bg-stone-100 dark:bg-neutral-800 text-sm px-3 py-1 rounded-full">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Ajouter un tag..."
            className="border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          />
          <button type="button" onClick={addTag} className="px-4 py-2 bg-stone-100 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors">
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-stone-700 disabled:opacity-50 transition-colors"
      >
        {saving ? "Enregistrement..." : initialData?.id ? "Mettre à jour" : "Créer le produit"}
      </button>
    </form>
  );
}
```

---

### Task 7: Products new + edit pages

**Files:**
- Create: `apps/ecommerce/src/app/admin/products/new/page.tsx`
- Create: `apps/ecommerce/src/app/admin/products/[id]/edit/page.tsx`

**new/page.tsx:**

```tsx
import { prisma } from "@repo/db";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProduct() {
  const categories = await prisma.category.findMany();
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Nouveau produit</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
```

**[id]/edit/page.tsx:**

```tsx
import { prisma } from "@repo/db";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProduct({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany(),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Modifier {product.name}</h1>
      <ProductForm
        categories={categories}
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock.toString(),
          categoryId: product.categoryId,
          images: product.images,
          tags: product.tags,
        }}
      />
    </div>
  );
}
```

---

### Task 8: Product CRUD API routes

**Files:**
- Create: `apps/ecommerce/src/app/api/admin/products/route.ts`
- Create: `apps/ecommerce/src/app/api/admin/products/[id]/route.ts`

**route.ts (POST):**

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  categoryId: z.string().min(1),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string;
  if (!["ADMIN", "SUPER_ADMIN"].includes(role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = schema.parse(await req.json());
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product, { status: 201 });
}
```

**[id]/route.ts (PATCH + DELETE):**

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string;
  if (!["ADMIN", "SUPER_ADMIN"].includes(role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const product = await prisma.product.update({ where: { id: params.id }, data: body });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string;
  if (!["ADMIN", "SUPER_ADMIN"].includes(role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
```

---

### Task 9: Orders admin page

**Files:**
- Create: `apps/ecommerce/src/app/admin/orders/page.tsx`

```tsx
import { prisma } from "@repo/db";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-600",
};

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Commandes</h1>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-neutral-800">
            <tr className="text-left text-stone-500">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-800">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-mono text-xs text-stone-400">{o.id.slice(0, 8)}</td>
                <td className="px-4 py-3">{o.user.email}</td>
                <td className="px-4 py-3 font-medium">{Number(o.total).toFixed(2)} €</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status] ?? "bg-stone-100 text-stone-600"}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### Task 10: Users admin page (SUPER_ADMIN only)

**Files:**
- Create: `apps/ecommerce/src/app/admin/users/page.tsx`

```tsx
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "SUPER_ADMIN") redirect("/admin");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Utilisateurs</h1>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-neutral-800">
            <tr className="text-left text-stone-500">
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Rôle</th>
              <th className="px-4 py-3 font-medium">Inscrit le</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-800">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 text-stone-500">{u.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-neutral-800 text-stone-700 dark:text-stone-300">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### Task 11: Commit Agent 2

```bash
git add -A
git commit -m "feat: custom admin panel with product management + Cloudinary upload

- Admin layout with role-aware sidebar navigation
- Dashboard with live stats (products, orders, users, blog posts)
- Products CRUD: list, create, edit with multi-image Cloudinary upload + tags
- Orders list with status badges
- Users management (SUPER_ADMIN only)
- API routes: POST/PATCH/DELETE /api/admin/products, POST /api/upload
- Role guards on all admin API routes (ADMIN/SUPER_ADMIN)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## AGENT 3 — Blog System + Skybot Webhook

### Task 1: Install markdown editor

In `apps/ecommerce/package.json` and `apps/website/package.json`, add:
```json
"@uiw/react-md-editor": "^4.0.0"
```

Run: `pnpm install`

---

### Task 2: Blog webhook API route (ecommerce)

**Files:**
- Create: `apps/ecommerce/src/app/api/blog/webhook/route.ts`

```typescript
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  tags: z.array(z.string()).default([]),
  publishImmediately: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.SKYBOT_WEBHOOK_SECRET;
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = schema.parse(await req.json());

  // Find or use a system/skybot user as author
  let author = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (!author) return NextResponse.json({ error: "No admin user found" }, { status: 500 });

  const post = await prisma.blogPost.upsert({
    where: { slug: body.slug },
    update: {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
      source: "SKYBOT",
      status: body.publishImmediately ? "PUBLISHED" : "DRAFT",
      publishedAt: body.publishImmediately ? new Date() : null,
    },
    create: {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      coverImage: body.coverImage,
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
      source: "SKYBOT",
      appTarget: "ECOMMERCE",
      status: body.publishImmediately ? "PUBLISHED" : "DRAFT",
      publishedAt: body.publishImmediately ? new Date() : null,
      authorId: author.id,
    },
  });

  return NextResponse.json({ id: post.id, slug: post.slug, status: post.status }, { status: 201 });
}
```

Duplicate for `apps/website/src/app/api/blog/webhook/route.ts` with `appTarget: "WEBSITE"`.

---

### Task 3: Blog admin list page (ecommerce)

**Files:**
- Create: `apps/ecommerce/src/app/admin/blog/page.tsx`

```tsx
import { prisma } from "@repo/db";
import Link from "next/link";
import { Plus, Pencil, Bot, User } from "lucide-react";

const STATUS_COLORS = {
  DRAFT: "bg-yellow-100 text-yellow-700",
  PUBLISHED: "bg-green-100 text-green-700",
  ARCHIVED: "bg-stone-100 text-stone-600",
};

export default async function AdminBlog() {
  const posts = await prisma.blogPost.findMany({
    where: { appTarget: "ECOMMERCE" },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tighter">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-stone-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouvel article
        </Link>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-neutral-800">
            <tr className="text-left text-stone-500">
              <th className="px-4 py-3 font-medium">Titre</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-800">
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium max-w-xs truncate">{p.title}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 text-xs text-stone-500">
                    {p.source === "SKYBOT" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    {p.source === "SKYBOT" ? "Skybot" : "Manuel"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(p.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/blog/${p.id}/edit`} className="text-stone-400 hover:text-stone-900">
                    <Pencil className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### Task 4: Blog editor component

**Files:**
- Create: `apps/ecommerce/src/components/admin/BlogEditor.tsx`

```tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface BlogEditorProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    metaTitle?: string;
    metaDesc?: string;
    status?: string;
  };
  appTarget: "ECOMMERCE" | "WEBSITE";
}

export function BlogEditor({ initialData, appTarget }: BlogEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
    metaTitle: initialData?.metaTitle ?? "",
    metaDesc: initialData?.metaDesc ?? "",
    status: initialData?.status ?? "DRAFT",
  });
  const [saving, setSaving] = useState(false);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: f.slug || generateSlug(title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = initialData?.id ? `/api/admin/blog/${initialData.id}` : "/api/admin/blog";
    const method = initialData?.id ? "PATCH" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, appTarget }),
    });
    setSaving(false);
    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre *</label>
          <input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Extrait</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contenu (Markdown) *</label>
        <div data-color-mode="light">
          <MDEditor
            value={form.content}
            onChange={(val) => setForm((f) => ({ ...f, content: val ?? "" }))}
            height={400}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image de couverture (URL)</label>
        <input
          value={form.coverImage}
          onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
          placeholder="https://..."
          className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Meta titre</label>
          <input
            value={form.metaTitle}
            onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Meta description</label>
          <input
            value={form.metaDesc}
            onChange={(e) => setForm((f) => ({ ...f, metaDesc: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          className="border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
        >
          <option value="DRAFT">Brouillon</option>
          <option value="PUBLISHED">Publier</option>
          <option value="ARCHIVED">Archiver</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          {saving ? "Enregistrement..." : initialData?.id ? "Mettre à jour" : "Créer l'article"}
        </button>
      </div>
    </form>
  );
}
```

---

### Task 5: Blog admin new + edit pages

**Files:**
- Create: `apps/ecommerce/src/app/admin/blog/new/page.tsx`
- Create: `apps/ecommerce/src/app/admin/blog/[id]/edit/page.tsx`

**new/page.tsx:**

```tsx
import { BlogEditor } from "@/components/admin/BlogEditor";

export default function NewBlogPost() {
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Nouvel article</h1>
      <BlogEditor appTarget="ECOMMERCE" />
    </div>
  );
}
```

**[id]/edit/page.tsx:**

```tsx
import { prisma } from "@repo/db";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { notFound } from "next/navigation";

export default async function EditBlogPost({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Modifier l&apos;article</h1>
      <BlogEditor
        appTarget="ECOMMERCE"
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? undefined,
          content: post.content,
          coverImage: post.coverImage ?? undefined,
          metaTitle: post.metaTitle ?? undefined,
          metaDesc: post.metaDesc ?? undefined,
          status: post.status,
        }}
      />
    </div>
  );
}
```

---

### Task 6: Blog CRUD API routes

**Files:**
- Create: `apps/ecommerce/src/app/api/admin/blog/route.ts`
- Create: `apps/ecommerce/src/app/api/admin/blog/[id]/route.ts`

**route.ts (POST):**

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  appTarget: z.enum(["ECOMMERCE", "WEBSITE"]),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = schema.parse(await req.json());
  const post = await prisma.blogPost.create({
    data: {
      ...body,
      source: "MANUAL",
      authorId: (session.user as any).id,
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
```

**[id]/route.ts (PATCH):**

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const post = await prisma.blogPost.update({
    where: { id: params.id },
    data: {
      ...body,
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role as string;
  if (!["ADMIN", "SUPER_ADMIN"].includes(role ?? ""))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
```

---

### Task 7: Update blog frontend pages to read from DB

**Files:**
- Modify: `apps/website/src/app/blog/page.tsx`
- Modify: `apps/website/src/app/blog/[slug]/page.tsx`

**blog/page.tsx:**

```tsx
import Link from "next/link";
import { Container, Section, Card } from "@repo/ui";
import { prisma } from "@repo/db";

export const metadata = { title: "Blog" };

export default async function Blog() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED", appTarget: "WEBSITE" },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="mb-12">
            <h1 className="text-4xl font-bold">Blog</h1>
            <p className="mt-4 text-neutral-600">Insights and tips for digital success</p>
          </div>
          {posts.length === 0 ? (
            <p className="text-neutral-500">Aucun article publié pour le moment.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.slug}>
                  <div className="flex flex-col justify-between md:flex-row md:items-center">
                    <div className="flex-1">
                      <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold hover:text-neutral-600">
                        {post.title}
                      </Link>
                      <p className="mt-2 text-neutral-600">{post.excerpt}</p>
                      <div className="mt-4 text-sm text-neutral-500">
                        By {post.author.name ?? post.author.email} •{" "}
                        {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="mt-4 text-neutral-600 hover:text-neutral-900 md:mt-0">
                      Read more →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
```

**blog/[slug]/page.tsx:** Read from DB via `prisma.blogPost.findUnique({ where: { slug } })`, render content as markdown using `react-markdown`. Add `"react-markdown": "^9.0.0"` to website's package.json.

---

### Task 8: Add @repo/db to website package.json

```json
"@repo/db": "workspace:*"
```

Run: `pnpm install`

Repeat for blog admin in website app (same structure as ecommerce, `appTarget: "WEBSITE"`).

---

### Task 9: Commit Agent 3

```bash
git add -A
git commit -m "feat: blog system with markdown editor + skybot-inbox webhook

- BlogPost model in Prisma (DRAFT/PUBLISHED/ARCHIVED, MANUAL/SKYBOT source)
- /api/blog/webhook in ecommerce + website (bearer secret auth, Zod validation)
- Blog admin: list, create, edit with @uiw/react-md-editor
- Blog CRUD API routes with role-aware auth
- Blog frontend reads from DB instead of hardcoded data
- Website app connected to @repo/db

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## AGENT 4 — Frontend UX Improvements

### Task 1: Install deps

In `apps/ecommerce/package.json`, add:
```json
"sonner": "^1.4.0",
"next-themes": "^0.2.1",
"next-nprogress-bar": "^2.3.0"
```

Run: `pnpm install`

---

### Task 2: Add Toaster + ThemeProvider + ProgressBar to layout

**Files:**
- Modify: `apps/ecommerce/src/components/providers.tsx`

```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { AppProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster position="bottom-right" richColors />
        <AppProgressBar color="#000" height="2px" options={{ showSpinner: false }} shallowRouting />
      </ThemeProvider>
    </SessionProvider>
  );
}
```

---

### Task 3: Dark mode toggle component

**Files:**
- Create: `packages/ui/src/components/ThemeToggle.tsx`

```tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
```

Export from `packages/ui/src/index.ts`.

---

### Task 4: Product search + filters (server-side)

**Files:**
- Modify: `apps/ecommerce/src/app/products/page.tsx`

Convert to a Server Component that reads `searchParams`:

```tsx
import { prisma } from "@repo/db";
import { Container, Section } from "@repo/ui";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";

interface SearchParams {
  q?: string;
  category?: string;
  tag?: string;
  minPrice?: string;
  maxPrice?: string;
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { q, category, tag, minPrice, maxPrice } = searchParams;

  const categories = await prisma.category.findMany();

  const products = await prisma.product.findMany({
    where: {
      ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] } : {}),
      ...(category ? { category: { slug: category } } : {}),
      ...(tag ? { tags: { has: tag } } : {}),
      ...(minPrice || maxPrice ? { price: { gte: minPrice ? parseFloat(minPrice) : undefined, lte: maxPrice ? parseFloat(maxPrice) : undefined } } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-5xl font-black tracking-tighter">Collection</h1>
              <p className="text-stone-500 mt-2">Curated objects for the discerning eye.</p>
            </div>
            <p className="text-sm text-stone-400">{products.length} produit{products.length !== 1 ? "s" : ""}</p>
          </div>

          <ProductFilters categories={categories} searchParams={searchParams} />

          {products.length === 0 ? (
            <EmptyState message="Aucun produit ne correspond à votre recherche." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 mt-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
```

---

### Task 5: ProductFilters client component

**Files:**
- Create: `apps/ecommerce/src/components/ProductFilters.tsx`

```tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTransition } from "react";

interface Category { id: string; name: string; slug: string; }

export function ProductFilters({
  categories,
  searchParams,
}: {
  categories: Category[];
  searchParams: Record<string, string | undefined>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(
      Object.entries(searchParams).filter(([, v]) => v != null) as [string, string][]
    );
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const clearAll = () => startTransition(() => router.push(pathname));

  const hasFilters = Object.values(searchParams).some(Boolean);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          defaultValue={searchParams.q ?? ""}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Rechercher..."
          className="pl-9 pr-4 py-2 border rounded-xl text-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 w-56"
        />
      </div>

      <select
        value={searchParams.category ?? ""}
        onChange={(e) => update("category", e.target.value)}
        className="border rounded-xl px-3 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-700"
      >
        <option value="">Toutes catégories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>{c.name}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          <X className="w-3 h-3" /> Effacer les filtres
        </button>
      )}
    </div>
  );
}
```

---

### Task 6: EmptyState + Skeleton components

**Files:**
- Create: `packages/ui/src/components/EmptyState.tsx`
- Create: `packages/ui/src/components/ProductSkeleton.tsx`

**EmptyState.tsx:**

```tsx
import { PackageSearch } from "lucide-react";

export function EmptyState({ message = "Rien ici pour l'instant." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-stone-400">
      <PackageSearch className="w-12 h-12 mb-4 opacity-40" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
```

**ProductSkeleton.tsx:**

```tsx
export function ProductSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-3">
      <div className="aspect-[3/4] rounded-2xl bg-stone-200 dark:bg-neutral-800" />
      <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded-full w-3/4" />
      <div className="h-3 bg-stone-200 dark:bg-neutral-800 rounded-full w-1/3" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  );
}
```

Export both from `packages/ui/src/index.ts`.

---

### Task 7: Wishlist (localStorage-based)

**Files:**
- Create: `apps/ecommerce/src/context/WishlistContext.tsx`

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WishlistCtx {
  items: string[];
  toggle: (productId: string) => void;
  isWished: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistCtx>({ items: [], toggle: () => {}, isWished: () => false });

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const toggle = (id: string) => {
    setItems((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem("wishlist", JSON.stringify(next));
      return next;
    });
  };

  return (
    <WishlistContext.Provider value={{ items, toggle, isWished: (id) => items.includes(id) }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
```

Add `<WishlistProvider>` inside `Providers`. Add wishlist heart button to `ProductCard` using `useWishlist()`.

---

### Task 8: Low-stock badge + breadcrumbs

**Product card:** Add `{product.stock < 5 && product.stock > 0 && <span className="text-xs text-red-500 font-medium">Plus que {product.stock} en stock</span>}` below price.

**Breadcrumb component** in `packages/ui/src/components/Breadcrumb.tsx`:

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb { label: string; href?: string; }

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-stone-400 mb-6">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-stone-900 transition-colors">{crumb.label}</Link>
          ) : (
            <span className="text-stone-900 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

Add to `packages/ui/src/index.ts` exports. Use on product detail page:

```tsx
<Breadcrumb crumbs={[{ label: "Accueil", href: "/" }, { label: "Produits", href: "/products" }, { label: product.name }]} />
```

---

### Task 9: Replace add-to-cart alert with sonner toast

**Files:**
- Modify: `apps/ecommerce/src/components/ProductCard.tsx` (or wherever `addItem` is called)

Replace `setAdded(true) / setTimeout` pattern with:

```tsx
import { toast } from "sonner";
// ...
const handleAdd = (e: React.MouseEvent) => {
  e.preventDefault();
  cart.addItem({ ... });
  toast.success(`${product.name} ajouté au panier`);
};
```

Remove `added` state and `setTimeout`.

---

### Task 10: Commit Agent 4

```bash
git add -A
git commit -m "feat: frontend UX — search/filters, wishlist, dark mode, toasts, skeletons

- Server-side product search + category/tag/price filters via URL params
- ProductFilters client component with instant URL updates
- WishlistContext (localStorage) with heart toggle on product cards
- EmptyState + ProductSkeleton components in packages/ui
- ThemeToggle component + next-themes dark mode
- sonner toast notifications (replaces setTimeout add-to-cart state)
- next-nprogress-bar navigation progress indicator
- Breadcrumb component in packages/ui
- Low-stock badge on product cards (stock < 5)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Post-Implementation Checklist

- [ ] `pnpm install` at root after all deps added
- [ ] `pnpm db:migrate` after schema changes (Task 1, Agent 1)
- [ ] `pnpm db:generate` to update Prisma client
- [ ] Create first SUPER_ADMIN user via seed script or Prisma Studio
- [ ] Fill `.env.local` with all new vars (NEXTAUTH_SECRET, CLOUDINARY_*, SKYBOT_WEBHOOK_SECRET)
- [ ] Test skybot webhook: `curl -X POST http://localhost:3003/api/blog/webhook -H "Authorization: Bearer <secret>" -H "Content-Type: application/json" -d '{"title":"Test","slug":"test","content":"# Hello","appTarget":"ECOMMERCE"}'`
- [ ] Verify admin login at `/auth/login` then `/admin`
