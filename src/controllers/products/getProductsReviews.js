import prisma from '../../db/prisma.js';
import createHttpError from 'http-errors';

export const getProductReviews = async(req, res) => {
    const {productId} = req.params;

    const reviews = await prisma.review.findMany({
        where: {
            productId,
        }

    });

    if(!reviews) {
        throw createHttpError(404, 'Reviews not found');
    }

    res.status(200).json(reviews);
}