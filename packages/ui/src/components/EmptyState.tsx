import { PackageSearch } from "lucide-react";

export function EmptyState({ message = "Rien ici pour l'instant." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-stone-400">
      <PackageSearch className="w-12 h-12 mb-4 opacity-40" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
