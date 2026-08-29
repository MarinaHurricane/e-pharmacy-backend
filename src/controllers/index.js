import { loginUser } from "./auth/loginUser.js";
import { logoutUser } from "./auth/logoutUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";
import { registerUser } from "./auth/registerUser.js";

export const auth = {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserSession,
}