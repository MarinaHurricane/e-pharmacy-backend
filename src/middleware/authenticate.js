import createHttpError from 'http-errors';
import prisma from "../db/prisma.js";

export const authenticate = async(req, res, next)=> {
    const {accessToken} = req.cookies;

    if(!accessToken) {
        throw createHttpError(401, 'Missing access token');
    };

    const session = await prisma.session.findUnique({
        where: {
            accessToken,
        }
    });

    if(!session) {
        throw createHttpError(401, 'Session not found')
    };

    const isTokenExpired = new Date() > session.accessTokenValidUntil;

    if(isTokenExpired) {
        throw createHttpError(401, 'Access token expired');
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        }
    });

    if(!user) {
        throw createHttpError(401, 'User not found')
    };

    req.user = user;
    next();
};