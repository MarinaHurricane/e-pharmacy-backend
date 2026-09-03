import prisma from '../../db/prisma.js';
import createHttpError from 'http-errors';

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
