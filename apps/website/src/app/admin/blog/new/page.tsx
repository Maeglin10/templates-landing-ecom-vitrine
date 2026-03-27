import { BlogEditor } from "@/components/admin/BlogEditor";

export default function NewBlogPost() {
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Nouvel article</h1>
      <BlogEditor appTarget="WEBSITE" />
    </div>
  );
}
