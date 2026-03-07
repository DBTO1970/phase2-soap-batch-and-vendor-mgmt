require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function test() {
  try {
    const batch = await prisma.soapBatch.upsert({
      where: { sheetId: 'row-test' },
      update: { name: 'test' },
      create: { sheetId: 'row-test', name: 'test' },
    });
    console.log('result', batch);
  } catch (e) {
    console.error('error', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
