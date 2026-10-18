import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

async function testPrisma() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("PRISMA SUCCESS:", result);
  } catch (err) {
    console.error("PRISMA ERROR:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
