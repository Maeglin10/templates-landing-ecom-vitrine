import { prisma } from "@repo/db";
import { notFound } from "next/navigation";
import { Container, Section } from "@repo/ui";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDesc ?? post.excerpt ?? undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: "PUBLISHED", appTarget: "ECOMMERCE" },
    include: { author: { select: { name: true, email: true } } },
  });
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors text-sm mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>

          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-stone-100 dark:bg-stone-900">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <h1 className="text-4xl font-black tracking-tighter mb-4">{post.title}</h1>
          <p className="text-stone-400 text-sm mb-12">
            Par {post.author.name ?? post.author.email} •{" "}
            {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <article className="prose prose-stone dark:prose-invert max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </Container>
      </Section>
    </main>
  );
}
