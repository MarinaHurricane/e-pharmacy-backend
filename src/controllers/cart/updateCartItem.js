import prisma from '../../db/prisma.js';
import createHttpError from 'http-errors';

export const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const productId = Number(req.params.productId);
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    throw createHttpError(400, 'Quantity must be at least 1');
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  const cartItem = await prisma.cartItem.update({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    data: {
      quantity,
    },
    include: {
      product: true,
    },
  });

  return res.status(200).json(cartItem);
};
