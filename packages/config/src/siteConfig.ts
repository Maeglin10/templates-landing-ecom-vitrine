export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mail: string;
  links?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export const createSiteConfig = (config: SiteConfig): SiteConfig => {
  return {
    name: config.name,
    description: config.description,
    url: config.url,
    ogImage: config.ogImage,
    mail: config.mail,
    links: config.links || {},
  };
};

export const defaultSiteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Site',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? 'Professional website',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: process.env.NEXT_PUBLIC_OG_IMAGE ?? 'http://localhost:3000/og.jpg',
  mail: process.env.NEXT_PUBLIC_SITE_EMAIL ?? 'contact@example.com',
};
