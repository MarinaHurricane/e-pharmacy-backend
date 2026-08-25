import prisma from '../db/prisma.js';
import products from '../../data/products.json' with { type: 'json' };

const data = products.map((product) => ({
  photo: product.photo,
  name: product.name,
  suppliers: product.suppliers,
  stock: Number(product.stock),
  price: product.price,
  category: product.category,
}));

try {
  await prisma.product.createMany({
    data,
  });

  console.log(`✅ ${data.length} products imported successfully`);
} catch (error) {
  console.error('❌ Failed to import products:', error);
} finally {
  await prisma.$disconnect();
}