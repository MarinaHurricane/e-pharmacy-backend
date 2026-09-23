import createHttpError from 'http-errors';
import prisma from '../../db/prisma.js';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../../services/auth.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  console.log('password:', password);
  console.log('user:', user);
  console.log('hashedPassword:', user.hashedPassword);

  const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentiald');
  }

  await prisma.session.deleteMany({
    where: {
      userId: user.id,
    },
  });

  const newSession = await createSession(user.id);

  console.log('SESSION CREATED:', {
  id: newSession.id,
  userId: newSession.userId,
  accessTokenValidUntil: newSession.accessTokenValidUntil,
  refreshTokenValidUntil: newSession.refreshTokenValidUntil,
});

  setSessionCookies(res, newSession);

  console.log('SET-COOKIE HEADER:', res.getHeader('Set-Cookie'));

    console.log(
    'SET-COOKIE EXISTS:',
    Boolean(res.getHeader('Set-Cookie')),
  );

  const { hashedPassword, ...userWithoutPassword } = user;

  

  res.status(200).json(userWithoutPassword);
};
