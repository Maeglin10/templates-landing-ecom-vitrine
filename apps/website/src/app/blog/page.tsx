import Link from "next/link";
import { Container, Section, Card } from "@repo/ui";
import { prisma } from "@repo/db";

export const metadata = { title: "Blog" };

export default async function Blog() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED", appTarget: "WEBSITE" },
    include: { author: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <div className="mb-12">
            <h1 className="text-4xl font-bold">Blog</h1>
            <p className="mt-4 text-neutral-600">Insights and tips for digital success</p>
          </div>
          {posts.length === 0 ? (
            <p className="text-neutral-500 py-12 text-center">Aucun article publié pour le moment.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.slug}>
                  <div className="flex flex-col justify-between md:flex-row md:items-center">
                    <div className="flex-1">
                      <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold hover:text-neutral-600">
                        {post.title}
                      </Link>
                      <p className="mt-2 text-neutral-600">{post.excerpt}</p>
                      <div className="mt-4 text-sm text-neutral-500">
                        By {post.author.name ?? post.author.email} •{" "}
                        {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="mt-4 text-neutral-600 hover:text-neutral-900 md:mt-0">
                      Read more →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
