import { prisma } from "@repo/db";
import Link from "next/link";
import { Plus, Pencil, Bot, User } from "lucide-react";

export const dynamic = 'force-dynamic';

const STATUS_COLORS = {
  DRAFT: "bg-yellow-100 text-yellow-700",
  PUBLISHED: "bg-green-100 text-green-700",
  ARCHIVED: "bg-stone-100 text-stone-600",
} as const;

export default async function AdminBlog() {
  const posts = await prisma.blogPost.findMany({
    where: { appTarget: "WEBSITE" },
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
