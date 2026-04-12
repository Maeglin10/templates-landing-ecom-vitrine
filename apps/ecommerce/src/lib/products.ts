export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  details: string[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "nordic-lamp",
    name: "Nordic Table Lamp",
    price: 89,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35eb07d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1200&q=80",
    ],
    description: "A minimalist Scandinavian table lamp with a warm, diffused glow perfect for reading nooks and bedside tables.",
    longDescription: "Inspired by Nordic design traditions, this table lamp combines clean geometric forms with a warm, inviting light. The matte ceramic base pairs beautifully with the linen shade, creating a soft, diffused glow that transforms any corner of your home. Adjustable brightness via a touch dimmer built into the cord.",
    rating: 4.8,
    reviewCount: 124,
    stock: 18,
    tags: ["nordic", "minimalist", "ceramic", "dimmable"],
    details: [
      "Matte ceramic base, 28cm tall",
      "Natural linen shade included",
      "Touch dimmer cord switch",
      "E27 bulb (warm 2700K LED included)",
      "2-year manufacturer warranty",
    ],
  },
  {
    id: "2",
    slug: "linen-cushion",
    name: "Linen Cushion Set",
    price: 45,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1200&q=80",
    ],
    description: "A set of two premium Belgian linen cushion covers in natural sand tones, with envelope closure.",
    longDescription: "Crafted from 100% pre-washed Belgian linen, these cushion covers develop a beautiful lived-in texture over time. The set includes two covers in complementary tones that layer naturally on any sofa or bed. Available in 50×50cm and 30×50cm.",
    rating: 4.7,
    reviewCount: 88,
    stock: 42,
    tags: ["linen", "natural", "sustainable", "set"],
    details: [
      "100% pre-washed Belgian linen",
      "Set of 2 covers (50×50cm)",
      "Envelope closure, no zips",
      "Machine washable at 40°C",
      "Inserts not included",
    ],
  },
  {
    id: "3",
    slug: "oak-shelf",
    name: "Oak Floating Shelf",
    price: 125,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    ],
    description: "A solid oak floating shelf with hidden bracket system, handcrafted in Normandy.",
    longDescription: "Each shelf is cut from a single piece of solid French oak, revealing the natural grain and warm honey tones of the wood. The invisible bracket system makes installation clean and the shelf appears to float on the wall. Available in 60cm, 90cm, and 120cm lengths.",
    rating: 4.9,
    reviewCount: 67,
    stock: 14,
    tags: ["oak", "handcrafted", "floating", "france"],
    details: [
      "Solid French oak, 3cm thick",
      "Available in 60cm / 90cm / 120cm",
      "Invisible bracket system included",
      "Supports up to 20kg",
      "Finished with natural Danish oil",
    ],
  },
  {
    id: "4",
    slug: "ceramic-vase",
    name: "Ceramic Vase",
    price: 35,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1534535009397-1fb0a46440f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
    ],
    description: "A handthrown ceramic vase with a reactive glaze finish, each piece unique.",
    longDescription: "Thrown on a wheel by artisan ceramicists in Portugal, each vase carries its own subtle imperfections that make it one-of-a-kind. The reactive glaze creates a watercolour-like surface that shifts between terracotta, cream, and smoke depending on the light.",
    rating: 4.6,
    reviewCount: 103,
    stock: 25,
    tags: ["ceramic", "handmade", "portugal", "artisan"],
    details: [
      "Handthrown stoneware",
      "Reactive glaze finish",
      "Height approx. 22cm (varies)",
      "Waterproof interior glaze",
      "Each piece is unique",
    ],
  },
  {
    id: "5",
    slug: "rattan-chair",
    name: "Rattan Accent Chair",
    price: 299,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    ],
    description: "A timeless rattan accent chair with a cushioned seat in natural cotton, handwoven in Indonesia.",
    longDescription: "This accent chair brings warmth and texture to any room. The frame is hand-woven from sustainably harvested rattan, with a removable seat cushion covered in heavyweight natural cotton canvas. Its gently curved form is as comfortable as it is beautiful.",
    rating: 4.9,
    reviewCount: 51,
    stock: 8,
    tags: ["rattan", "natural", "handwoven", "sustainable"],
    details: [
      "Hand-woven natural rattan frame",
      "Removable cotton canvas cushion",
      "Dimensions: 75cm H × 60cm W × 60cm D",
      "Weight capacity: 120kg",
      "Sustainably sourced materials",
    ],
  },
  {
    id: "6",
    slug: "pendant-light",
    name: "Brass Pendant Light",
    price: 175,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35eb07d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1200&q=80",
    ],
    description: "A statement brass pendant light with a hand-spun shade that casts a warm, moody light.",
    longDescription: "Handcrafted in a Copenhagen atelier, this pendant light features a hand-spun solid brass shade with a brushed satin finish. The adjustable cord allows installation at heights from 30cm to 150cm below the ceiling. Perfect above a dining table or kitchen island.",
    rating: 4.8,
    reviewCount: 39,
    stock: 11,
    tags: ["brass", "handspun", "pendant", "dining"],
    details: [
      "Solid brushed brass shade",
      "Adjustable cord: 30–150cm",
      "E27 socket (bulb not included)",
      "Compatible with dimmers",
      "Canopy hardware included",
    ],
  },
  {
    id: "7",
    slug: "wool-throw",
    name: "Merino Wool Throw",
    price: 95,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    ],
    description: "An oversized merino wool throw woven in Scotland — incredibly soft, warm, and built to last generations.",
    longDescription: "Woven at a family-run mill in the Scottish Highlands using pure merino wool, this throw is extraordinarily soft against the skin while being naturally temperature-regulating. An heirloom piece that gets better with every wash.",
    rating: 4.9,
    reviewCount: 77,
    stock: 22,
    tags: ["merino", "wool", "scotland", "heirloom"],
    details: [
      "100% merino wool (18.5 micron)",
      "Dimensions: 140cm × 200cm",
      "Available in 4 colourways",
      "Hand wash cold or dry clean",
      "Made in Scotland",
    ],
  },
  {
    id: "8",
    slug: "walnut-table",
    name: "Walnut Coffee Table",
    price: 450,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    ],
    description: "A solid black walnut coffee table with tapered legs, handcrafted by French artisan woodworkers.",
    longDescription: "This coffee table is made to order by a small workshop in Bordeaux. The solid black walnut top showcases a rich chocolate grain finished with a hand-rubbed oil to nourish and protect the wood for decades. Tapered solid oak legs provide a light, floating feel.",
    rating: 5.0,
    reviewCount: 28,
    stock: 4,
    tags: ["walnut", "handcrafted", "bordeaux", "made-to-order"],
    details: [
      "Solid black walnut top, 3cm thick",
      "Tapered solid oak legs",
      "Dimensions: 110cm × 60cm × 38cm H",
      "Hand-rubbed natural oil finish",
      "Lead time: 4–6 weeks",
    ],
  },
  {
    id: "9",
    slug: "glass-lamp",
    name: "Smoked Glass Lamp",
    price: 155,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1200&q=80",
    ],
    description: "A cylindrical smoked glass table lamp with a brass base — sultry, sculptural, and atmospheric.",
    longDescription: "The deep amber smoked glass cylinder diffuses light into a warm amber glow, perfect for creating intimate, atmospheric lighting. The solid brass base is weighted for stability. This lamp makes a statement on a console, nightstand, or shelf.",
    rating: 4.7,
    reviewCount: 44,
    stock: 16,
    tags: ["glass", "brass", "smoked", "sculptural"],
    details: [
      "Mouth-blown smoked glass shade",
      "Solid brass base",
      "Height: 42cm",
      "E14 socket (bulb included)",
      "Pairs beautifully with Nordic Lamp",
    ],
  },
  {
    id: "10",
    slug: "terracotta-pot",
    name: "Terracotta Plant Pot",
    price: 28,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&q=80",
    ],
    description: "Traditional Italian terracotta pots with a matte unglazed finish — timeless and breathable.",
    longDescription: "Thrown and fired in Impruneta, Tuscany — home of the world's finest terracotta — these pots are prized by gardeners for their breathability and by decorators for their rich, earthy warmth. Sold individually in three sizes.",
    rating: 4.5,
    reviewCount: 156,
    stock: 60,
    tags: ["terracotta", "italy", "garden", "plant"],
    details: [
      "100% natural Italian terracotta",
      "Available in S (12cm), M (18cm), L (25cm)",
      "Unglazed for root breathability",
      "Drainage hole in base",
      "Frost resistant to −5°C",
    ],
  },
  {
    id: "11",
    slug: "velvet-cushion",
    name: "Velvet Cushion",
    price: 55,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    ],
    description: "A plush velvet cushion cover in deep jewel tones with a hidden zip closure.",
    longDescription: "Woven in Lyon from a rich cotton velvet, this cushion cover has a satisfying weight and a lustrous sheen that catches the light. The deep jewel tones — forest, sapphire, and bordeaux — add drama to a neutral sofa or bed. Filled insert included.",
    rating: 4.8,
    reviewCount: 92,
    stock: 35,
    tags: ["velvet", "lyon", "jewel-tones", "luxury"],
    details: [
      "100% cotton velvet",
      "50×50cm with insert included",
      "Hidden zip closure",
      "Available in 3 colours",
      "Dry clean recommended",
    ],
  },
  {
    id: "12",
    slug: "bamboo-ladder",
    name: "Bamboo Ladder Shelf",
    price: 189,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
    ],
    description: "A leaning bamboo ladder shelf with 4 tiers — lightweight, sustainable, and endlessly versatile.",
    longDescription: "Made from FSC-certified solid bamboo, this ladder shelf leans against any wall with no fixings required. Use it as a bookshelf, display shelf, or bathroom storage. The natural bamboo grain varies slightly, making each piece unique.",
    rating: 4.6,
    reviewCount: 63,
    stock: 19,
    tags: ["bamboo", "sustainable", "fsc", "versatile"],
    details: [
      "FSC-certified solid bamboo",
      "4 shelves, 160cm tall",
      "No wall fixings required",
      "Weight capacity: 10kg per shelf",
      "Assembly takes under 5 minutes",
    ],
  },
];

export const categories = ["Lighting", "Furniture", "Decor"];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
