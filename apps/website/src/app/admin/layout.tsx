import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  const role = (session.user as any).role as string;

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="w-60 bg-white border-r flex flex-col p-4 gap-1">
        <div className="px-3 py-4 mb-2">
          <span className="font-black text-lg tracking-tighter">Admin</span>
          <p className="text-xs text-stone-400 mt-0.5">{role}</p>
        </div>
        <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-stone-100 transition-colors">
          <FileText className="w-4 h-4" /> Blog
        </Link>
        <div className="mt-auto">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" /> Déconnexion
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
