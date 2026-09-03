import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";
import { registerUser } from "./auth/registerUser.js";
import { getProductById } from "./products/getProductById.js";
import { productsController } from "./products/productsController.js";

export const auth = {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserSession,
}

export const products = {
    productsController,
    getProductById,
}