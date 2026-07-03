import { prisma } from '../lib/prisma';
import * as fs from 'fs';

async function main() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany();
  const settings = await prisma.settings.findFirst();

  let seedCode = `import { PrismaClient } from "../lib/generated/prisma/client";\n`;
  seedCode += `const prisma = new PrismaClient();\n\n`;
  seedCode += `async function main() {\n`;
  seedCode += `  console.log("Seeding database...");\n\n`;

  // Seed Settings
  if (settings) {
    seedCode += `  await prisma.settings.upsert({\n`;
    seedCode += `    where: { id: "${settings.id}" },\n`;
    seedCode += `    update: {},\n`;
    seedCode += `    create: ${JSON.stringify(settings, null, 6).replace(/"([^"]+)":/g, '$1:')}\n`;
    seedCode += `  });\n\n`;
  }

  // Seed Categories
  for (const cat of categories) {
    seedCode += `  await prisma.category.upsert({\n`;
    seedCode += `    where: { id: "${cat.id}" },\n`;
    seedCode += `    update: {},\n`;
    seedCode += `    create: ${JSON.stringify(cat, null, 6).replace(/"([^"]+)":/g, '$1:')}\n`;
    seedCode += `  });\n\n`;
  }

  // Seed Products
  for (const prod of products) {
    seedCode += `  await prisma.product.upsert({\n`;
    seedCode += `    where: { id: "${prod.id}" },\n`;
    seedCode += `    update: {},\n`;
    seedCode += `    create: ${JSON.stringify(prod, null, 6).replace(/"([^"]+)":/g, '$1:')}\n`;
    seedCode += `  });\n\n`;
  }

  seedCode += `  console.log("Database seeded successfully!");\n`;
  seedCode += `}\n\n`;
  seedCode += `main()\n`;
  seedCode += `  .then(async () => {\n`;
  seedCode += `    await prisma.$disconnect();\n`;
  seedCode += `  })\n`;
  seedCode += `  .catch(async (e) => {\n`;
  seedCode += `    console.error(e);\n`;
  seedCode += `    await prisma.$disconnect();\n`;
  seedCode += `    process.exit(1);\n`;
  seedCode += `  });\n`;

  fs.writeFileSync('./prisma/seed.ts', seedCode);
  console.log('Seed file generated at prisma/seed.ts');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
