import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Categories ──────────────────────────────────────────────
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: { name: 'Electronics', slug: 'electronics' },
  });

  const furniture = await prisma.category.upsert({
    where: { slug: 'furniture' },
    update: {},
    create: { name: 'Furniture', slug: 'furniture' },
  });

  // ── Products ────────────────────────────────────────────────
  await prisma.product.upsert({
    where: { slug: 'minimal-alpha-chair' },
    update: {},
    create: {
      name: 'Minimal Alpha Chair',
      slug: 'minimal-alpha-chair',
      description:
        'An iconic minimalist chair designed for ultimate comfort and style.',
      price: 499.0,
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=1200&fit=crop',
      ],
      stock: 25,
      tags: ['chair', 'minimal'],
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'concrete-desk-lamp' },
    update: {},
    create: {
      name: 'Concrete Desk Lamp',
      slug: 'concrete-desk-lamp',
      description:
        'Industrial-grade concrete base with warm LED lighting. A statement piece for any workspace.',
      price: 129.0,
      images: [
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1200&h=1200&fit=crop',
      ],
      stock: 50,
      tags: ['lamp', 'industrial'],
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'lounge-concept-sofa' },
    update: {},
    create: {
      name: 'Lounge Concept Sofa',
      slug: 'lounge-concept-sofa',
      description:
        'A contemporary modular sofa system for modern living spaces.',
      price: 1899.0,
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=1200&fit=crop',
      ],
      stock: 8,
      tags: ['sofa', 'modular', 'lounge'],
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'monochrome-planter' },
    update: {},
    create: {
      name: 'Monochrome Planter',
      slug: 'monochrome-planter',
      description:
        'Matte black ceramic planter, handcrafted for indoor plants.',
      price: 85.0,
      images: [
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=1200&h=1200&fit=crop',
      ],
      stock: 100,
      tags: ['planter', 'ceramic', 'monochrome'],
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'oak-wood-shelf' },
    update: {},
    create: {
      name: 'Oak Wood Shelf',
      slug: 'oak-wood-shelf',
      description:
        'Solid oak floating shelf with invisible mounting hardware. Perfect for displaying books and decor.',
      price: 349.0,
      images: [
        'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=1200&fit=crop',
      ],
      stock: 30,
      tags: ['shelf', 'oak', 'wood'],
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'brass-table-clock' },
    update: {},
    create: {
      name: 'Brass Table Clock',
      slug: 'brass-table-clock',
      description:
        'Vintage-inspired brass table clock with silent quartz movement. A timeless accent for any room.',
      price: 195.0,
      images: [
        'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1200&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1415604934674-561df9abf539?w=1200&h=1200&fit=crop',
      ],
      stock: 22,
      tags: ['clock', 'brass', 'vintage'],
      categoryId: electronics.id,
    },
  });

  // ── Super Admin User ────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin1234!', 12);

  await prisma.user.upsert({
    where: { email: 'admin@store.com' },
    update: {},
    create: {
      email: 'admin@store.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
