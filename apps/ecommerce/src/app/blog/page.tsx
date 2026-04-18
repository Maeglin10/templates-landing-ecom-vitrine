export const dynamic = 'force-dynamic';
import { prisma } from "@repo/db";
import { Container, Section } from "@repo/ui";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Journal" };

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED", appTarget: "ECOMMERCE" },
    include: { author: { select: { name: true, email: true } } },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 pt-24">
      <Section>
        <Container>
          <div className="mb-12">
            <h1 className="text-5xl font-black tracking-tighter">Journal</h1>
            <p className="text-stone-500 mt-2">Stories, guides, and thoughts from the studio.</p>
          </div>
          {posts.length === 0 ? (
            <p className="text-stone-400 py-16 text-center">Aucun article publie pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="h-full flex flex-col">
                    {post.coverImage && (
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-stone-100 dark:bg-stone-900">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-stone-400 mb-2">
                        {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-4">
                      Par {post.author.name ?? post.author.email}
                    </p>
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
