export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  stock: number;
  images: string[];
  details: string[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "minimal-alpha-chair",
    name: "Minimal Alpha Chair",
    price: 499,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
    description: "Premium minimalist chair for modern spaces.",
    rating: 4.9,
    reviewCount: 128,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1487015307662-2c60a4d4bf32?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1200&h=1200&fit=crop",
    ],
    details: [
      "Sustainably sourced hardwood",
      "Comfort-engineered for long sessions",
      "Limited batch craftsmanship",
      "Free returns within 30 days",
    ],
  },
  {
    id: "2",
    slug: "concrete-desk-lamp",
    name: "Concrete Desk Lamp",
    price: 129,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
    description: "Industrial concrete base with warm LED.",
    rating: 4.7,
    reviewCount: 64,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=1200&fit=crop",
    ],
    details: [
      "Hand-poured concrete base",
      "Warm 2700K LED included",
      "Braided textile cable",
      "2-year warranty",
    ],
  },
  {
    id: "3",
    slug: "lounge-concept-sofa",
    name: "Lounge Concept Sofa",
    price: 1899,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
    description: "Modular sofa designed for contemporary living.",
    rating: 5.0,
    reviewCount: 212,
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=1200&fit=crop",
    ],
    details: [
      "Modular pieces for any layout",
      "Performance fabric upholstery",
      "Stain-resistant finish",
      "Free white-glove delivery",
    ],
  },
  {
    id: "4",
    slug: "monochrome-planter",
    name: "Monochrome Planter",
    price: 85,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop",
    description: "Matte black ceramic planter, handcrafted.",
    rating: 4.8,
    reviewCount: 88,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&h=1200&fit=crop",
    ],
    details: [
      "Handcrafted ceramic",
      "Matte charcoal finish",
      "Drainage hole included",
      "Fits 4–6 inch plants",
    ],
  },
  {
    id: "5",
    slug: "oak-wood-shelf",
    name: "Oak Wood Shelf",
    price: 349,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
    description: "Solid oak floating shelf with brass brackets.",
    rating: 4.6,
    reviewCount: 51,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1200&h=1200&fit=crop",
    ],
    details: [
      "Solid oak construction",
      "Brass mounting hardware",
      "Hidden wall anchors",
      "Supports up to 30kg",
    ],
  },
  {
    id: "6",
    slug: "brass-table-clock",
    name: "Brass Table Clock",
    price: 195,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    description: "Brushed brass minimalist table clock.",
    rating: 4.9,
    reviewCount: 39,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&h=1200&fit=crop",
    ],
    details: [
      "Brushed brass body",
      "Silent sweep movement",
      "Battery included",
      "Minimalist dial design",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
