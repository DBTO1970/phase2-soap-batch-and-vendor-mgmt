// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set. Please check your .env file.');
  throw new Error('DATABASE_URL environment variable is not set.');
}

// Ensure only one PrismaClient instance is created in development
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    // Add logging to see if there are issues during client initialization
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Add a check to ensure prisma is not undefined after initialization
if (!prisma) {
  console.error('Failed to initialize Prisma Client.');
  throw new Error('Failed to initialize Prisma Client.');
}
