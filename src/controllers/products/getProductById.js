import prisma from '../../db/prisma.js';
import createHttpError from 'http-errors';

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};
