// lib/prisma.ts (or src/lib/prisma.ts)
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // We pass the URL here to ensure it uses our env variable
    datasourceUrl: process.env.DATABASE_URL,
    // Optional: Log queries to the console so you can see the sync happening
    log: ['query'], 
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;