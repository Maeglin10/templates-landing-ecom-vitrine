import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, FileText, Users } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

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
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
