import createHttpError from 'http-errors';
import prisma from '../../db/prisma.js';

export const getLocations = async (req, res) => {
  const locations = await prisma.location.findMany();

  if (!locations) {
    throw createHttpError(404, 'Locations not found');
  }

  res.status(200).json(locations);
};
