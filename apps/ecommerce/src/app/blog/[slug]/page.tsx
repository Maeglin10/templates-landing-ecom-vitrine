import { prisma } from "@repo/db";
import { notFound } from "next/navigation";
import { Container, Section, Breadcrumb } from "@repo/ui";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDesc ?? post.excerpt ?? undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: "PUBLISHED", appTarget: "ECOMMERCE" },
    include: { author: { select: { name: true, email: true } } },
  });
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container className="max-w-3xl">
          <Breadcrumb
            crumbs={[
              { label: "Accueil", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />

          {post.coverImage && (
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10 shadow-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-10">
            <h1 className="text-4xl font-black tracking-tighter leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-stone-500 text-sm">
              {post.author.name ?? post.author.email} ·{" "}
              {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(
                "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </p>
            {post.excerpt && (
              <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 leading-relaxed border-l-4 border-stone-200 dark:border-stone-700 pl-4">
                {post.excerpt}
              </p>
            )}
          </header>

          <article className="prose prose-stone dark:prose-invert max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </Container>
      </Section>
    </main>
  );
}
