import prisma from '../db/prisma.js';
import products from '../../data/vitamins.json' with { type: 'json' };


// const prisma = new PrismaClient();

const seedProducts = async () => {
//   try {
//     await prisma.product.deleteMany();
// const data = products.map((product) => ({
//   photo: product.photo,
//   name: product.name,
//   suppliers: product.suppliers,
//   stock: Number(product.stock),
//   price: product.price,
//   category: product.category,
// }));


//   await prisma.product.createMany({
//     data,
//   });

//   console.log(`✅ ${data.length} products imported successfully`);
// } catch (error) {
//   console.error('❌ Failed to import products:', error);
// } finally {
//   await prisma.$disconnect();
// }
for (const product of products) {
  await prisma.product.upsert({
    where: {
      id: Number(product.id),
    },
    update: {
      photo: product.photo,
      name: product.name,
      suppliers: product.suppliers,
      stock: Number(product.stock),
      price: Number(product.price),
      discount: product.discount,
      category: product.category,
      description: product.description,
    },
    create: {
      id: Number(product.id),
      photo: product.photo,
      name: product.name,
      suppliers: product.suppliers,
      stock: Number(product.stock),
      price: Number(product.price),
      discount: product.discount,
      category: product.category,
      description: product.description,
    },
  });
}
}

seedProducts();