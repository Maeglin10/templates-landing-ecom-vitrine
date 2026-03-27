"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full"
    >
      <LogOut className="w-4 h-4" />
      Déconnexion
    </button>
  );
}
