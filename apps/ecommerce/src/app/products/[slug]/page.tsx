export const dynamic = 'force-dynamic';
import { prisma } from "@repo/db";
import { notFound } from "next/navigation";
import { Container, Section, Breadcrumb } from "@repo/ui";
import type { Metadata } from "next";
import { ProductDetailClient } from "./ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return {};
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3003';
  const ogUrl = `${appUrl}/api/og?title=${encodeURIComponent(product.name)}&subtitle=${encodeURIComponent(product.description)}&price=${encodeURIComponent(`€${Number(product.price).toFixed(2)}`)}`;
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: ogUrl, width: 1200, height: 630, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [ogUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      reviews: {
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) notFound();

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      : null;

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <Breadcrumb
            crumbs={[
              { label: "Accueil", href: "/" },
              { label: "Produits", href: "/products" },
              {
                label: product.category.name,
                href: `/products?category=${product.category.slug}`,
              },
              { label: product.name },
            ]}
          />
          <ProductDetailClient
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              description: product.description,
              price: Number(product.price),
              images: product.images,
              stock: product.stock,
              tags: product.tags,
              categoryName: product.category.name,
              categorySlug: product.category.slug,
              avgRating,
              reviewCount: product.reviews.length,
              reviews: product.reviews.map((r) => ({
                id: r.id,
                rating: r.rating,
                comment: r.comment,
                authorName: r.user.name ?? r.user.email,
                createdAt: r.createdAt.toISOString(),
              })),
            }}
          />
        </Container>
      </Section>
    </main>
  );
}
