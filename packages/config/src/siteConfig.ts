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
  name: 'Site',
  description: 'Professional website',
  url: 'http://localhost:3000',
  ogImage: 'http://localhost:3000/og.jpg',
  mail: 'contact@example.com',
};
