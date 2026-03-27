"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface Category { id: string; name: string; }

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  images: string[];
  tags: string[];
}

interface ProductFormProps {
  categories: Category[];
  initialData?: Partial<ProductFormData> & { id?: string };
}

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? "",
    stock: initialData?.stock ?? "",
    categoryId: initialData?.categoryId ?? "",
    images: initialData?.images ?? [],
    tags: initialData?.tags ?? [],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: f.slug || generateSlug(name) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        setError(`Erreur upload: ${file.name}`);
        break;
      }
      const data = await res.json();
      if (data.url) setForm((f) => ({ ...f, images: [...f.images, data.url] }));
    }
    setUploading(false);
  };

  const removeImage = (url: string) => {
    setForm((f) => ({ ...f, images: f.images.filter((img) => img !== url) }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (!tag || form.tags.includes(tag)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = initialData?.id ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
    const method = initialData?.id ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Erreur lors de l'enregistrement. Veuillez réessayer.");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom *</label>
          <input
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
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
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={4}
          className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Prix (€) *</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock *</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Catégorie *</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
            required
          >
            <option value="">Choisir...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Photos</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.images.map((url) => (
            <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100">
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="w-24 h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-stone-400 transition-colors text-stone-400">
            <Upload className="w-5 h-5 mb-1" />
            <span className="text-xs">{uploading ? "..." : "Upload"}</span>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags / Filtres</label>
        <div className="flex gap-2 flex-wrap mb-2">
          {form.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 bg-stone-100 dark:bg-neutral-800 text-sm px-3 py-1 rounded-full">
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            placeholder="Ajouter un tag..."
            className="border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-stone-100 dark:bg-neutral-800 rounded-xl text-sm font-medium hover:bg-stone-200 dark:hover:bg-neutral-700 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-stone-700 disabled:opacity-50 transition-colors"
      >
        {saving ? "Enregistrement..." : initialData?.id ? "Mettre à jour" : "Créer le produit"}
      </button>
    </form>
  );
}
