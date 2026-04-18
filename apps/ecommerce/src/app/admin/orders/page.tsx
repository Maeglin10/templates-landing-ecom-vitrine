export const dynamic = 'force-dynamic';
import { prisma } from "@repo/db";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-600",
};

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Commandes</h1>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border dark:border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-neutral-800">
            <tr className="text-left text-stone-500">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-neutral-800">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-mono text-xs text-stone-400">{o.id.slice(0, 8)}</td>
                <td className="px-4 py-3">{o.user.email}</td>
                <td className="px-4 py-3 font-medium">{Number(o.total).toFixed(2)} €</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status] ?? "bg-stone-100 text-stone-600"}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
