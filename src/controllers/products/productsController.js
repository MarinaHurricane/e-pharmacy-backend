import prisma from '../../db/prisma.js';

export const productsController = async (req, res) => {
  const { page, perPage, search, category } = req.query;

  const skip = (page - 1) * perPage;

  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (category) {
    where.category = category;
  }

  const [totalProducts, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip,
      take: perPage,
    }),
  ]);

  const totalPages = Math.ceil(totalProducts / perPage);

  res.status(200).json({ page, perPage, totalProducts, totalPages, products });
};
