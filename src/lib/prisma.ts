// src/lib/prisma.ts
import { PrismaClient } from '../generated/prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = `${process.env.DATABASE_URL}`;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: connectionString,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;