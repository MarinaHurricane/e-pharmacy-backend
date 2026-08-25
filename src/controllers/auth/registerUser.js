import prisma from "../../db/prisma.js";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from "../../services/auth.js";

export const registerUser = async(req, res) => {
    const {name, email, phone, password} = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if(existingUser) {
        throw createHttpError(400, 'Email in use');
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
        name,
        email,
        phone,
        hashedPassword,
        }
       
    });

    const newSessiion = await createSession(newUser.id);
   
 setSessionCookies(res, newSessiion);

    res.status(201).json(newUser);
};