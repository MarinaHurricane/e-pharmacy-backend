import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/time.js";
import crypto from 'node:crypto';
import prisma from "../db/prisma.js";

export const createSession = async(userId) => {
    return prisma.session.create({
        data: {
            userId,
            accessToken: crypto.randomBytes(30).toString('base64'),
            refreshToken: crypto.randomBytes(30).toString('base64'),
            accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
            refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
        },
    });
};

export const setSessionCookies = (res, session) => {
    res.cookie('accessToken', session.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: FIFTEEN_MINUTES,
    });
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ONE_DAY,
    });
    res.cookie('sessionId', session.id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ONE_DAY,
    });
};