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
