import createHttpError from 'http-errors';
import prisma from '../../db/prisma.js';

export const createOrder = async (req, res) => {
  const userId = req.user.id;

  const {
    name,
    email,
    phone,
    address,
    paymentMethod = 'CASH_ON_DELIVERY',
  } = req.body;

  const order = await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw createHttpError(400, 'Cart is empty');
    }

    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        throw createHttpError(400, `Not enough ${item.product.name} in stock`);
      }
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    const newOrder = await tx.order.create({
      data: {
        userId,
        name,
        email,
        phone,
        address,
        paymentMethod,
        total,

        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },

      include: {
        items: true,
      },
    });

    for (const item of cart.items) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        spent: {
          increment: total,
        },
      },
    });

    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return newOrder;
  });

  return res.status(201).json(order);
};
