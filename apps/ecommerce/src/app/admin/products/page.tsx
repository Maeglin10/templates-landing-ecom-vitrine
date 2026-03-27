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
