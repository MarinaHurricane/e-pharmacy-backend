import prisma from './db/prisma.js';

const testDb = async () => {
  try {
    const users = await prisma.user.findMany();

    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

testDb();