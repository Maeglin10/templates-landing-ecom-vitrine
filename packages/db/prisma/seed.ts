import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Categories
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

  // Products
  await prisma.product.upsert({
    where: { slug: 'minimal-alpha-chair' },
    update: {},
    create: {
      name: 'Minimal Alpha Chair',
      slug: 'minimal-alpha-chair',
      description: 'An iconic minimalist chair designed for ultimate comfort and style.',
      price: 499.00,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
      stock: 25,
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'concrete-desk-lamp' },
    update: {},
    create: {
      name: 'Concrete Desk Lamp',
      slug: 'concrete-desk-lamp',
      description: 'Industrial-grade concrete base with warm LED lighting. A statement piece for any workspace.',
      price: 129.00,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop',
      stock: 50,
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'lounge-concept-sofa' },
    update: {},
    create: {
      name: 'Lounge Concept Sofa',
      slug: 'lounge-concept-sofa',
      description: 'A contemporary modular sofa system for modern living spaces.',
      price: 1899.00,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
      stock: 8,
      categoryId: furniture.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'monochrome-planter' },
    update: {},
    create: {
      name: 'Monochrome Planter',
      slug: 'monochrome-planter',
      description: 'Matte black ceramic planter, handcrafted for indoor plants.',
      price: 85.00,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop',
      stock: 100,
      categoryId: furniture.id,
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
