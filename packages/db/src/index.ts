import { PrismaClient } from '@prisma/client';

// Singleton pattern — avoid multiple PrismaClient instances in dev (Next.js hot reload)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export type { User, Product, Category, Order, OrderItem } from '@prisma/client';
export { PrismaClient } from '@prisma/client';
