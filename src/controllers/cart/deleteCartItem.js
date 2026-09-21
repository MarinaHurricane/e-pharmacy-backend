import prisma from '../../db/prisma.js';
import createHttpError from 'http-errors';

export const deleteCartItem = async (req, res) => {
  const userId = req.user.id;
  const productId = Number(req.params.productId);

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  return res.status(200).json({
    message: 'Product removed from cart',
  });
};
