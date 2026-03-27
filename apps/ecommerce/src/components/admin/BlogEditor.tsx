"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface BlogEditorProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    metaTitle?: string;
    metaDesc?: string;
    status?: string;
  };
  appTarget: "ECOMMERCE" | "WEBSITE";
}

export function BlogEditor({ initialData, appTarget }: BlogEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
    metaTitle: initialData?.metaTitle ?? "",
    metaDesc: initialData?.metaDesc ?? "",
    status: initialData?.status ?? "DRAFT",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: f.slug || generateSlug(title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = initialData?.id ? `/api/admin/blog/${initialData.id}` : "/api/admin/blog";
    const method = initialData?.id ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, appTarget }),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Erreur lors de l'enregistrement.");
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre *</label>
          <input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Extrait</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contenu (Markdown) *</label>
        <div data-color-mode="light">
          <MDEditor
            value={form.content}
            onChange={(val) => setForm((f) => ({ ...f, content: val ?? "" }))}
            height={400}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image de couverture (URL)</label>
        <input
          value={form.coverImage}
          onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
          placeholder="https://..."
          className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Meta titre</label>
          <input
            value={form.metaTitle}
            onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Meta description</label>
          <input
            value={form.metaDesc}
            onChange={(e) => setForm((f) => ({ ...f, metaDesc: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          className="border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
        >
          <option value="DRAFT">Brouillon</option>
          <option value="PUBLISHED">Publier</option>
          <option value="ARCHIVED">Archiver</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          {saving ? "Enregistrement..." : initialData?.id ? "Mettre à jour" : "Créer l'article"}
        </button>
      </div>
    </form>
  );
}
