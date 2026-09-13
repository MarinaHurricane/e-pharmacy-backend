import prisma from '../db/prisma.js';
import products from '../../data/vitamins.json' with { type: 'json' };

const seedProducts = async () => {
  console.log(products[0]);
console.log('First description:', products[0].description);
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
};

seedProducts()
  .then(() => {
    console.log(`Updated ${products.length} products`);
  })
  .catch((error) => {
    console.error('Failed to seed products:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });