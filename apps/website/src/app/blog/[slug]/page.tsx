import { prisma } from "@repo/db";
import { notFound } from "next/navigation";
import { Container, Section } from "@repo/ui";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDesc ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, status: "PUBLISHED" },
    include: { author: true },
  });
  if (!post) notFound();

  return (
    <main>
      <Section>
        <Container className="max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-neutral-500 text-sm">
              By {post.author.name ?? post.author.email} •{" "}
              {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <article className="space-y-4 text-neutral-700 leading-relaxed">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </Container>
      </Section>
    </main>
  );
}
