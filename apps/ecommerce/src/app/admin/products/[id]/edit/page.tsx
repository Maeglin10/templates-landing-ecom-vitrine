export const dynamic = 'force-dynamic';
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
