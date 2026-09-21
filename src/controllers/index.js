import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";
import { registerUser } from "./auth/registerUser.js";
import { getLocations } from "./locations/getLocations.js";
import { getCategories } from "./products/getCategories.js";
import { getProductById } from "./products/getProductById.js";
import { getProductReviews } from "./products/getProductsReviews.js";
import { productsController } from "./products/productsController.js";
import { getCurrentUser } from "./user/getCurrentUser.js";
import { addCartItem } from "./cart/addCartItem.js";
import { deleteCartItem } from "./cart/deleteCartItem.js";
import { updateCartItem } from "./cart/updateCartItem.js";
import { getCart } from "./cart/getCart.js";

export const auth = {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserSession,
}

export const products = {
    productsController,
    getProductById,
    getCategories,
    getProductReviews,
}

export const user = {
    getCurrentUser,
}

export const locations = {
    getLocations,
}

export const cart = {
    getCart,
    deleteCartItem,
    updateCartItem,
    addCartItem,
}