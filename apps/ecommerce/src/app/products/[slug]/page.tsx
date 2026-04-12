import { notFound } from "next/navigation";
import { Container, Section } from "@repo/ui";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0] ?? ""] },
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <ProductDetailClient
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              description: product.longDescription,
              price: product.price,
              images: product.images,
              stock: product.stock,
              tags: product.tags,
              categoryName: product.category,
              categorySlug: product.category.toLowerCase(),
              avgRating: product.rating,
              reviewCount: product.reviewCount,
              details: product.details,
              reviews: [],
            }}
            relatedProducts={related.map((r) => ({
              id: r.id,
              name: r.name,
              slug: r.slug,
              price: r.price,
              images: r.images,
              stock: r.stock,
            }))}
          />
        </Container>
      </Section>
    </main>
  );
}
