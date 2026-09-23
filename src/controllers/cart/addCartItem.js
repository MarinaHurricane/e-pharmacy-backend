// import prisma from '../../db/prisma.js';
// import createHttpError from 'http-errors';

// export const addCartItem = async (req, res) => {
//   const userId = req.user.id;
//   const { productId, quantity = 1 } = req.body;

//   const product = await prisma.product.findUnique({
//     where: { id: productId },
//   });

//   if (!product) {
//    throw createHttpError(404, 'Product not found')
//   }

//   const cart = await prisma.cart.upsert({
//     where: { userId },
//     update: {},
//     create: { userId },
//   });

//   const cartItem = await prisma.cartItem.upsert({
//     where: {
//       cartId_productId: {
//         cartId: cart.id,
//         productId,
//       },
//     },
//     update: {
//       quantity: {
//         increment: quantity,
//       },
//     },
//     create: {
//       cartId: cart.id,
//       productId,
//       quantity,
//     },
//     include: {
//       product: true,
//     },
//   });

//   return res.status(200).json(cartItem);
// };


import prisma from '../../db/prisma.js';
import createHttpError from 'http-errors';

export const addCartItem = async (req, res) => {
  const userId = req.user.id;

  const { productId, quantity = 1 } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  // Check whether this product is already in the cart
  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  const newQuantity =
    (existingCartItem?.quantity ?? 0) + quantity;

  if (newQuantity > product.stock) {
    throw createHttpError(
      400,
      `Only ${product.stock} items available`,
    );
  }

  const cartItem = await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },

    update: {
      quantity: {
        increment: quantity,
      },
    },

    create: {
      cartId: cart.id,
      productId,
      quantity,
    },

    include: {
      product: true,
    },
  });

  return res.status(200).json(cartItem);
};
