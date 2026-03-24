import Link from 'next/link';
import { Container, Section } from '@repo/ui';
import { getBlogPost, blogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.title,
    description: post.description,
  };
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Section className="bg-neutral-50">
        <Container>
          <Link href="/blog" className="text-neutral-600 hover:text-neutral-900">
            ← Back to Blog
          </Link>

          <article className="mt-8 max-w-2xl">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="mt-4 text-sm text-neutral-600">
              By {post.author} • {new Date(post.date).toLocaleDateString()}
            </div>

            <div className="prose mt-12 space-y-4">
              {post.content
                .split('\n')
                .filter((line) => line.trim())
                .map((line, i) => {
                  if (line.startsWith('# ')) {
                    return (
                      <h1 key={i} className="mt-6 text-2xl font-bold">
                        {line.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={i} className="mt-4 text-xl font-semibold">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  return (
                    <p key={i} className="text-neutral-600">
                      {line}
                    </p>
                  );
                })}
            </div>
          </article>
        </Container>
      </Section>
    </main>
  );
}
