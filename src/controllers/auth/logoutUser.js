import prisma from '../../db/prisma.js';

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await prisma.session.delete({
      where: {
        id: Number(sessionId),
      },
    });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).end();
};
