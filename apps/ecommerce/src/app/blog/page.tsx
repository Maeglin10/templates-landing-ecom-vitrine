import { prisma } from "@repo/db";
import { Container, Section } from "@repo/ui";
import { formatCurrency } from "@repo/lib";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, tips, and inspiration from our team.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED", appTarget: "ECOMMERCE" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <div className="mb-12">
            <h1 className="text-5xl font-black tracking-tighter mb-3">Blog</h1>
            <p className="text-stone-500 dark:text-stone-400 text-lg">
              Articles, tips, and inspiration from our team.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-24 text-stone-400">
              <p className="text-xl">No articles yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 hover:shadow-xl transition-shadow">
                    {post.coverImage ? (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-stone-100 dark:bg-stone-800" />
                    )}
                    <div className="p-6">
                      <p className="text-xs text-stone-400 mb-2">
                        {new Date(
                          post.publishedAt ?? post.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {post.author.name && ` · ${post.author.name}`}
                      </p>
                      <h2 className="text-xl font-bold leading-snug mb-2 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
