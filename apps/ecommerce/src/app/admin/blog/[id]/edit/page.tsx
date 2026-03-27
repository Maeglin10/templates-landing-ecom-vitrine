import { prisma } from "@repo/db";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { notFound } from "next/navigation";

export default async function EditBlogPost({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tighter mb-8">Modifier l&apos;article</h1>
      <BlogEditor
        appTarget="ECOMMERCE"
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? undefined,
          content: post.content,
          coverImage: post.coverImage ?? undefined,
          metaTitle: post.metaTitle ?? undefined,
          metaDesc: post.metaDesc ?? undefined,
          status: post.status,
        }}
      />
    </div>
  );
}
