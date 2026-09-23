import prisma from '../../db/prisma.js';

export const getCart = async (req, res) => {
      console.log('GET CART CONTROLLER');
  const userId = req.user.id;

  console.log(userId);

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    return res.status(200).json({
      items: [],
    });
  }

  return res.status(200).json(cart);
};