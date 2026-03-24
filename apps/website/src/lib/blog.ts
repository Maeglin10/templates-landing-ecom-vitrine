export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Learn how to get started with our services.',
    date: '2024-01-15',
    author: 'John Doe',
    content: `
# Getting Started

This is a comprehensive guide to help you get started.

## First Steps

Start by exploring our services and understanding what we offer.

## Next Steps

Contact us to learn more about how we can help your business.
    `,
  },
  {
    slug: 'best-practices',
    title: 'Best Practices',
    description: 'Follow these best practices for optimal results.',
    date: '2024-01-10',
    author: 'Jane Smith',
    content: `
# Best Practices

Here are the key practices to follow:

## Practice 1
Always start with clear goals.

## Practice 2
Measure and iterate continuously.
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
