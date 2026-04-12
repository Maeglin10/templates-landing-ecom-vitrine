export const dynamic = 'force-dynamic';
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "SUPER_ADMIN") redirect("/admin");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Utilisateurs</h1>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-neutral-800">
            <tr className="text-left text-stone-500">
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Rôle</th>
              <th className="px-4 py-3 font-medium">Inscrit le</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-800">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 text-stone-500">{u.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-neutral-800 text-stone-700 dark:text-stone-300">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
