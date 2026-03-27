import { prisma } from "@repo/db";
import { Prisma } from "@prisma/client";
import { Container, Section, EmptyState } from "@repo/ui";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";

interface PageProps {
  searchParams: { q?: string; category?: string; tag?: string };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { q, category, tag } = searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: {
        ...(q ? {
          OR: [
            { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
            { description: { contains: q, mode: Prisma.QueryMode.insensitive } },
          ],
        } : {}),
        ...(category ? { category: { slug: category } } : {}),
        ...(tag ? { tags: { has: tag } } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-5xl font-black tracking-tighter">Collection</h1>
              <p className="text-stone-500 mt-2">Curated objects for the discerning eye.</p>
            </div>
            <p className="text-sm text-stone-400">
              {products.length} produit{products.length !== 1 ? "s" : ""}
            </p>
          </div>

          <ProductFilters categories={categories} searchParams={searchParams} />

          {products.length === 0 ? (
            <EmptyState message="Aucun produit ne correspond à votre recherche." />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: Number(product.price),
                    images: product.images,
                    stock: product.stock,
                  }}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
