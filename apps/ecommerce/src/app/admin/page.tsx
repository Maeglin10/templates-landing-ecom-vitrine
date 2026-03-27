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
