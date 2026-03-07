require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const connectionString = process.env.DATABASE_URL;
(async () => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
  try {
    const cols = await prisma.$queryRaw`SELECT column_name, column_default, is_nullable FROM information_schema.columns WHERE table_name='SoapBatch'`;
    console.log('columns', cols);
  } catch (e) {
    console.error('error', e);
  } finally {
    await prisma.$disconnect();
  }
})();
