import createHttpError from 'http-errors';
import prisma from '../../db/prisma.js';
import { createSession, setSessionCookies } from '../../services/auth.js';

export const refreshUserSession = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  if (!refreshToken || !sessionId) {
  throw createHttpError(401, 'Missing session credentials');
}

  const session = await prisma.session.findFirst({
    where: {
      id: Number(sessionId),
      refreshToken,
    },
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isTokenExpired = new Date() > session.refreshTokenValidUntil;

  if (isTokenExpired) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });
    throw createHttpError(401, 'Session token expired');
  }

  await prisma.session.delete({
    where: {
      id: session.id,
    },
  });

  const newSession = await createSession(session.userId);

  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};
